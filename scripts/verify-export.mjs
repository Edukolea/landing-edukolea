import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const html = await readFile("out/index.html", "utf8");
assert.match(html, /<html[^>]*lang="es"/);
assert.equal((html.match(/<h1\b/g) || []).length, 1, "Exactly one H1");
for (const content of ["Crea sesiones de aprendizaje", "AulaLista IA", "Kolea en Pares", "Kolea Reporta", "nombre provisional", "contacto@edukolea.com"]) {
  assert.ok(html.includes(content), `Initial HTML contains ${content}`);
}
assert.match(html, /<title>EduKolea \| Crea sesiones de aprendizaje con IA<\/title>/);
assert.match(html, /<link rel="canonical" href="https:\/\/edukolea.com\/"/);
assert.match(html, /<meta name="description" content="Crea sesiones/);
assert.match(html, /<meta property="og:image" content="https:\/\/edukolea.com\/og-edukolea.png"/);
assert.match(html, /<meta name="robots" content="index, follow"/);
assert.match(html, /<form[^>]*method="POST"/);
assert.ok(!/<form[^>]*action=/.test(html), "No native redirect to FormSubmit");
assert.match(html, /<fieldset[^>]*disabled/, "Guard personal data before hydration");
assert.match(html, /<button[^>]*type="submit"/);
assert.match(html, /<button[^>]*type="submit"[^>]*disabled/, "AJAX requires hydration before sending");
for (const name of ["service", "contact_method", "name", "profile", "email", "consent"]) {
  assert.ok(new RegExp(`<(?:input|select)(?=[^>]*\\bname="${name}")(?=[^>]*\\brequired)[^>]*>`).test(html), `${name} is required`);
}
assert.match(html, /name="_honey"/);
assert.ok(!html.includes('name="_captcha"'), "Keep provider CAPTCHA enabled");
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
const robots = await readFile("out/robots.txt", "utf8");
assert.match(robots, /Allow: \//);
assert.ok(robots.includes("Sitemap: https://edukolea.com/sitemap.xml"));
const sitemap = await readFile("out/sitemap.xml", "utf8");
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), ["https://edukolea.com/"]);
assert.equal((await readFile("out/CNAME", "utf8")).trim(), "edukolea.com");
for (const file of [".nojekyll", "favicon.ico", "brand-icon.png", "apple-touch-icon.png", "og-edukolea.png", "logo/logoEdukolea.webp", "aliados/oea.png", "aliados/aws.png", "aliados/incuba-centro.png"]) await access(`out/${file}`);
console.log("Static export verified: content, metadata, anchors, AJAX guard, services, allies, consent, sitemap and brand assets.");
