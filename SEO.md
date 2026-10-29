# SEO y auditoría de EduKole

## Implementado

- Next.js App Router en Vercel; formulario en `/api/contacto/` con Nodemailer.
- Título: `AulaLista IA | Sesiones de aprendizaje con IA · EduKole`.
- Descripción centrada en sesiones de aprendizaje, AulaLista IA, docentes y colegios.
- URL canónica: `https://edukolea.com/`; idioma español; un H1 y encabezados semánticos.
- Open Graph y Twitter con imagen de marca de 1200 × 630; favicon e icono Apple.
- Datos estructurados JSON-LD: Organization, WebSite y WebPage, con referencias coherentes y datos públicos reales. No se añaden reseñas, precios ni resultados inventados.
- `public/robots.txt` permite rastreo y declara el sitemap. `public/sitemap.xml` contiene solamente la URL canónica, sin campañas ni fragmentos.
- Imágenes derivadas WebP con dimensiones reservadas. Originales conservados; regenerar con `node scripts/optimize-images.mjs`.
- Portada visible desde el HTML inicial, sin esperar la animación de entrada. Ilustración principal precargada; imágenes inferiores con carga diferida; reproductor YouTube cargado al entrar en pantalla, con alternativa sin JavaScript.
- Reproductor del MVP incrustado y adaptable, con título accesible y enlace alternativo.
- Google Analytics todavía no está instalado. La instrumentación actual emite eventos locales sin datos personales del formulario.

## Lighthouse

Medir una compilación de producción; el servidor de desarrollo agrega herramientas y trabajo que distorsionan la medición.

```powershell
npm run build
npm run start -- --port 3003
```

Abrir `http://localhost:3003/` en Chrome o Brave, DevTools → Lighthouse. Ejecutar Navigation con Performance, Accessibility, Best Practices y SEO; primero Mobile y después Desktop. Guardar el informe y repetir en condiciones comparables. La reproducción del video se comprueba además manualmente.

Verificación funcional sobre ese servidor (sin enviar correos):

```powershell
$env:VERIFY_URL = 'http://127.0.0.1:3003'
node scripts/verify-site.mjs
```

La auditoría local no comprueba DNS, redirecciones del dominio, HTTPS del despliegue ni indexación real. Una vez publicado, repetir Lighthouse en `https://edukolea.com/`.

## Después de publicar

1. Verificar en Vercel que el dominio preferido es `edukolea.com` y que la variante `www` redirige a él.
2. Confirmar respuestas 200 de portada, robots y sitemap, sin `noindex` de un entorno de preview.
3. Verificar la propiedad de dominio en Google Search Console mediante el registro TXT suministrado por Google. Enviar `https://edukolea.com/sitemap.xml` y usar Inspección de URL.
4. Validar JSON-LD con Schema Markup Validator y los tipos compatibles con Rich Results Test. El marcado no garantiza resultados enriquecidos ni posiciones.
5. Conectar GA4 cuando esté disponible el ID `G-…`, definir la configuración de consentimiento y actualizar el aviso de privacidad según el comportamiento implementado. No enviar nombres, correos o teléfonos a la analítica. `generate_lead` solo debe emitirse tras confirmación real del servidor.

## Fuentes

- Guías de la versión instalada: `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`, `12-images.md` y `01-app/02-guides/json-ld.md`.
- [Google: Organization](https://developers.google.com/search/docs/appearance/structured-data/organization).
- [Google: políticas de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- [Chrome DevTools: Lighthouse](https://developer.chrome.com/docs/devtools/lighthouse/).


## Resultado de Lighthouse — 28 de octubre de 2026

Auditorías con Lighthouse 13.6.0, Chrome headless y servidor local `next start` en el puerto 3003. Puntajes de una ejecución por perfil sobre la compilación final:

| Categoría | Móvil | Escritorio |
|---|---:|---:|
| Rendimiento | 98 | 99 |
| Accesibilidad | 100 | 100 |
| Buenas prácticas | 100 | 96 |
| SEO | 100 | 100 |
| LCP | 1,2 s | 0,4 s |
| TBT | 70 ms | 60 ms |
| CLS | 0 | 0 |

En escritorio, el descuento de Buenas prácticas corresponde a una advertencia de cookies del reproductor externo de YouTube, visible en ese perfil. En móvil el reproductor se carga al llegar a la sección. La primera auditoría móvil, anterior a diferir la carga del reproductor hasta su entrada en pantalla, dio 66 en Rendimiento.

Los resultados son de laboratorio local, no métricas de visitantes ni una garantía de posiciones en Google. Repetir sobre el despliegue público. Los informes HTML y JSON de ambas ejecuciones finales se entregaron fuera de `.next` para conservarlos después de nuevas compilaciones.
