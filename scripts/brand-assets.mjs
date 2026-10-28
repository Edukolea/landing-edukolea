// Uses sharp already supplied by Next.js; does not modify the source logo.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const logo = "public/logo/logoEdukolea.webp";
await sharp(logo).resize(192, 192, { fit: "contain" }).png().toFile("public/brand-icon.png");
await sharp(logo).resize(180, 180, { fit: "contain" }).png().toFile("public/apple-touch-icon.png");
const png = await sharp(logo).resize(48, 48, { fit: "contain" }).ensureAlpha().png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico[6] = 48; ico[7] = 48;
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14); ico.writeUInt32LE(22, 18);
await writeFile("app/favicon.ico", Buffer.concat([ico, png]));
const background = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#f6faf2"/>
<path d="M65 100H1135M65 552H1135" stroke="#d4d3cb"/>
<text x="65" y="72" font-family="Arial" font-size="26" fill="#364e48" font-weight="bold">EduKolea.</text>
<text x="65" y="163" font-family="Arial" font-size="14" letter-spacing="3" fill="#364e48">PARA DOCENTES Y COLEGIOS</text>
<g font-family="Arial" font-size="58" fill="#364e48"><text x="65" y="250">Crea sesiones</text><text x="65" y="319">de aprendizaje</text></g>
<text x="65" y="395" font-family="Georgia" font-style="italic" font-size="61" fill="#364e48">con apoyo de IA</text>
<rect x="65" y="447" width="250" height="52" rx="7" fill="#63de6c"/>
<text x="90" y="480" font-family="Arial" font-size="20" fill="#364e48">Solicitar una demo ↗</text>
<text x="65" y="593" font-family="Arial" font-size="17" fill="#364e48">edukolea.com</text>
<circle cx="930" cy="311" r="188" fill="#e8eee3"/><circle cx="930" cy="311" r="167" fill="none" stroke="#abb1ab"/>
</svg>`);
const mark = await sharp(logo).resize(280, 280).png().toBuffer();
await sharp(background).composite([{ input: mark, left: 790, top: 171 }]).png().toFile("public/og-edukolea.png");
console.log("Brand icons and 1200×630 OG image generated.");
