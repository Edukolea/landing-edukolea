import assert from "node:assert/strict";
import { setTimeout } from "node:timers/promises";

const base = process.env.VERIFY_URL || "http://127.0.0.1:3001";
let page;
for (let attempt = 0; attempt < 40; attempt++) {
  try { page = await fetch(base); if (page.ok) break; } catch {}
  await setTimeout(250);
}
assert.ok(page?.ok, "Next.js server is running");
const html = await page.text();
const resource = async path => {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  return response.text();
};
assert.match(html, /<html[^>]*lang="es"/);
assert.equal((html.match(/<h1\b/g) || []).length, 1, "Exactly one H1");
for (const content of ["Crea sesiones de aprendizaje", "AulaLista IA", "Kolea en Pares", "Kolea Reporta", "nombre provisional", "contacto@edukolea.com"]) {
  assert.ok(html.includes(content), `Initial HTML contains ${content}`);
}
assert.match(html, /<title>EduKole \| Crea sesiones de aprendizaje con IA<\/title>/);
assert.match(html, /<link rel="canonical" href="https:\/\/edukolea.com\/"/);
assert.match(html, /<meta name="description" content="Crea sesiones/);
assert.match(html, /<meta property="og:image" content="https:\/\/edukolea.com\/og-edukole.png"/);
assert.match(html, /<meta name="robots" content="index, follow"/);
assert.match(html, /<form[^>]*method="POST"/);
assert.ok(!/<form[^>]*action=/.test(html), "Form submits through the same-origin API");
assert.match(html, /<fieldset[^>]*disabled/, "Guard personal data before hydration");
assert.match(html, /<button[^>]*type="submit"/);
assert.match(html, /<button[^>]*type="submit"[^>]*disabled/, "AJAX requires hydration before sending");
for (const name of ["service", "contact_method", "name", "profile", "email", "consent"]) {
  assert.ok(new RegExp(`<(?:input|select)(?=[^>]*\\bname="${name}")(?=[^>]*\\brequired)[^>]*>`).test(html), `${name} is required`);
}
assert.match(html, /name="_honey"/);
assert.ok(!html.includes('name="_captcha"'), "No obsolete provider options");
assert.ok(!html.includes("koedukoperu@gmail.com"), "No old contact address");
assert.ok(!html.includes("/_next/image?"), "No server image optimization");
for (const id of ["servicios", "nosotros", "aliados"]) assert.ok(html.includes(`id="${id}"`));
for (const slug of ["aula_lista_ia", "kolea_en_pares", "kolea_reporta"]) assert.ok(html.includes(`?servicio=${slug}#demo`), "Every service preselects the form");
assert.equal((html.match(/<summary>Explorar /g) || []).length, 3, "Three keyboard/touch disclosures");
for (const href of html.matchAll(/href="#([^"<]+)"/g)) {
  assert.ok(html.includes(`id="${href[1]}"`), `Anchor #${href[1]} resolves`);
}
assert.match(html, /href="mailto:contacto@edukolea.com"/);
assert.match(html, /href="https:\/\/wa.me\/51906815008"/);
const robots = await resource("/robots.txt");
assert.match(robots, /Allow: \//);
assert.ok(robots.includes("Sitemap: https://edukolea.com/sitemap.xml"));
const sitemap = await resource("/sitemap.xml");
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), ["https://edukolea.com/"]);

for (const file of ["favicon.ico", "brand-icon.png", "apple-touch-icon.png", "og-edukole.png", "logo/logoEduKole.webp", "aliados/oea.png", "aliados/aws.png", "aliados/incuba-centro.png"]) await resource(`/${file}`);
assert.ok(!html.includes("FormSubmit"), "No former provider in page copy");
const endpoint = new URL("/api/contacto/", base);
assert.equal((await fetch(endpoint)).status, 405);
assert.equal((await fetch(endpoint, {method:"POST", headers:{origin:endpoint.origin,"content-type":"application/json"}, body:"{}"})).status,400);
assert.equal((await fetch(endpoint, {method:"POST", headers:{origin:"https://external.invalid","content-type":"application/json"}, body:"{}"})).status,403);
console.log("Next.js verified: pages, assets, metadata, form, services, allies and live API method/origin/validation guards. No emails sent.");
