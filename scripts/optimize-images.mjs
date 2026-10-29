// Reproducible derivatives; keep the original brand artwork intact.
import sharp from "sharp";
import { stat } from "node:fs/promises";

for (const [source, target, width] of [
  ["public/logo/logomain.png", "public/logo/hero-classroom.webp", 640],
  ["public/logo/logomain.png", "public/logo/hero-classroom-320.webp", 320],
  ["public/logo/logoEduKole.webp", "public/logo/brand-mark.webp", 96],
  ["public/aliados/oea.png", "public/aliados/oea.webp", 450],
]) {
  await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(target);
  console.log(`${target}: ${(await stat(target)).size} bytes (source: ${(await stat(source)).size})`);
}
