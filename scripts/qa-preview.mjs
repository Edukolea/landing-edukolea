// Local browser QA only. Fixtures are injected into the preview HTML, never out/.
// Without ?qa=<scenario>, this serves the untouched production export.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".webp": "image/webp", ".png": "image/png", ".ico": "image/x-icon", ".svg": "image/svg+xml" };
const scenarios = ["success", "activation", "rejected", "invalid-json", "http-error", "network-error", "timeout"];
createServer(async (req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) { res.writeHead(405).end(); return; }
  try {
    const url = new URL(req.url, "http://localhost");
    const path = decodeURIComponent(url.pathname);
    const file = resolve(root, `.${path.endsWith("/") ? `${path}index.html` : path}`);
    if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    let body = await readFile(file);
    const scenario = url.searchParams.get("qa");
    if (path === "/" && scenarios.includes(scenario)) {
      const injection = `<script>
        const scenario = ${JSON.stringify(scenario)};
        const originalFetch = window.fetch.bind(window);
        window.fetch = async (url, options) => {
          if (String(url) !== "https://formsubmit.co/ajax/contacto@edukolea.com") return originalFetch(url, options);
          document.documentElement.dataset.qaRequests = String(Number(document.documentElement.dataset.qaRequests || 0) + 1);
          await new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, scenario === "timeout" ? 25000 : 2500);
            options.signal.addEventListener("abort", () => { clearTimeout(timer); reject(new DOMException("Timed out", "AbortError")); }, { once: true });
          });
          if (scenario === "network-error") throw new TypeError("QA: network offline");
          if (scenario === "http-error") return new Response("Unavailable", {status:503});
          if (scenario === "invalid-json") return new Response("not json");
          if (scenario === "activation") return Response.json({success:"true", message:"Please activate your form by confirming your email."});
          if (scenario === "rejected") return Response.json({success:"false", message:"Submission rejected"});
          return Response.json({success:"true", message:"The form was successfully submitted."});
        };
        document.addEventListener("DOMContentLoaded", () => {
          const banner = document.createElement("div");
          banner.textContent = "PRUEBA LOCAL: " + scenario + " (respuesta simulada)";
          banner.style.cssText = "position:fixed;bottom:0;left:0;background:#fff0ba;color:#364e48;font:11px Arial;padding:8px;z-index:99999";
          document.body.append(banner);
        });
      </script>`;
      body = Buffer.from(body.toString().replace("<head>", `<head>${injection}`));
    }
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch { res.writeHead(404).end("Not found"); }
}).listen(3001, "127.0.0.1", () => console.log("QA preview: http://localhost:3001 (optional ?qa=success|activation|rejected|invalid-json|http-error|network-error|timeout)"));
