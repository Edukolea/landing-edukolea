// Load actual TS modules for Node checks without emitting files or loading .env.
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";
const require = createRequire(import.meta.url);
const modules = new Map();
async function moduleUrl(path) {
  path = resolve(path);
  if (modules.has(path)) return modules.get(path);
  let source = ts.transpileModule(await readFile(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText.replace(/^import ["']server-only["'];?\s*/m, "");
  for (const match of [...source.matchAll(/from ["']([^"']+)["']/g)]) {
    const spec = match[1];
    if (spec.startsWith(".")) source = source.replace(match[0], `from ${JSON.stringify(await moduleUrl(resolve(dirname(path), `${spec}.ts`)))}`);
    else if (!spec.startsWith("node:")) source = source.replace(match[0], `from ${JSON.stringify(pathToFileURL(require.resolve(spec)).href)}`);
  }
  const url = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  modules.set(path, url);
  return url;
}
export async function loadTypeScript(path) { return import(await moduleUrl(path)); }
