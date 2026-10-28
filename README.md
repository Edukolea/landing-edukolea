# EduKolea

Primera landing en español para docentes y colegios. Next.js 16.4.3, React 19.3, App Router y TypeScript, con CSS Modules y variables de marca. No se añadieron dependencias. Se leyeron completos LANDING_BRIEF.md y SEO.md y las guías locales de exportación, metadata, robots, sitemap, iconos, imágenes y CSS antes de implementar.

## Desarrollo y verificación

Revisión del 28 de octubre de 2026: se conservó el trabajo existente, el logo y la paleta. Se destacó AulaLista IA desde la portada, se adelantó su texto a la ilustración en móvil, se reforzaron las alternativas de contacto y se corrigieron el foco sobre fondo oscuro, el salto al contenido y el enlace que ahora despliega el aviso de privacidad. El formulario está habilitado con envío POST a FormSubmit, dirigido a contacto@edukolea.com; requiere activar el receptor desde ese buzón.

Se verificó la exportación local en navegador a 1280 px y en móvil a 390 y 320 px, con navegación por teclado, cambios de servicio/medio. Esa revisión precede a la habilitación del formulario; los controles actuales se verifican con el script de exportación. Lint, build y los dos scripts de verificación finalizaron correctamente. Los recursos locales del HTML resuelven; `/`, robots, sitemap, favicon y OG responden 200 en la vista estática local. Esto no verifica recepción de mensajes, DNS, HTTPS ni publicación. Los pendientes de lanzamiento se detallan abajo.

```sh
npm ci
npm run dev
npm run lint
npm run build
node scripts/verify-export.mjs
node scripts/verify-measurement.mjs
npm start
```

`npm start` sirve **solo la exportación local** en http://localhost:3000; requiere `out/` generado. El formulario se procesa externamente mediante FormSubmit. `next start` no sirve proyectos con `output: "export"`.

- `app/components/sections.tsx`: navegación, portada, servicios, pasos y pie.
- `app/components/demo-form.tsx`: formulario POST con validación nativa, consentimiento, honeypot y verificación de seguridad de FormSubmit.
- `app/components/actions.tsx`: CTA y enlaces de contacto instrumentados.
- `app/lib/content.ts`: nombres provisionales, oferta y contactos.
- `app/lib/measurement.ts`: eventos locales y conservación controlada de UTM.
- `app/components/landing.module.css` y `app/globals.css`: estilos adaptables, paleta, foco y movimiento reducido.
- `scripts/brand-assets.mjs`: iconos y OG de 1200 × 630 a partir del logo original. Usa `sharp`, ya incluido por Next.js. Ejecutar manualmente si cambian los recursos de marca; los archivos generados están versionados.
- `scripts/verify-export.mjs`: comprobaciones sobre HTML inicial, metadata, enlaces internos, destinatario POST, campos habilitados y consentimiento del formulario, recursos y sitemap.
- `scripts/verify-measurement.mjs`: pruebas de atribución permitida, descarte de valores arbitrarios, persistencia durante la visita y almacenamiento bloqueado, sin receptor ni llamadas de red.

El logo de `public/logo/logoEdukolea.webp` permanece intacto. La ilustración del libro es decorativa y no representa una captura ni una interfaz del producto. No se incluyeron testimonios, clientes, cifras, precios ni promesas de integración con SIAGIE.

## Exportación estática

`next.config.ts` declara `output: "export"`, `trailingSlash: true` e `images.unoptimized: true`. Se desactivaron los flags originales `cacheComponents` y `partialPrefetching`: no se necesita renderizado parcial ni caché de servidor en esta landing estática. Se conserva `agentFeedback`; se retiró el loader CSS de Tailwind del starter porque no se usan utilidades Tailwind y provocaba un fallo de proceso al compilar CSS Modules en este entorno. Las dependencias originales de Tailwind siguen disponibles. La identidad visual usa CSS propio, sin depender de utilidades Tailwind. Se usan fuentes del sistema para no necesitar descargas durante el build.

El build genera `out/` con HTML indexable y recursos locales. No hay Server Actions, API de recepción, cookies, servicios externos de fuentes ni optimizador de imágenes de servidor.

## GitHub Pages, DNS y HTTPS pendientes

El destino preparado es **https://edukolea.com/** en la raíz; no se configuró `basePath` para `/landing-edukolea`. La URL de proyecto github.io no es el host de producción previsto.

1. En GitHub, confirmar la rama de publicación y habilitar **Settings → Pages → Source: GitHub Actions**. El workflow `.github/workflows/pages.yml` se ejecuta manualmente desde Actions cuando los cambios estén en la rama predeterminada. Compila, comprueba y publica únicamente `out/`. Requiere permisos Pages, OIDC y el entorno `github-pages`; respetar sus reglas de protección.
2. Verificar la propiedad del dominio en GitHub y agregar **edukolea.com** en Custom domain antes de cambiar DNS. `public/CNAME` se copia a `out/`, pero **en un workflow de Actions ese archivo no configura el dominio**; hay que hacerlo en Settings → Pages.
3. En el proveedor DNS, configurar el apex con ALIAS/ANAME al host Pages de la cuenta, o los registros A/AAAA vigentes de la documentación oficial. Para `www`, configurar CNAME a `koedukoperu-png.github.io` y confirmar la redirección a la raíz. No apuntar el CNAME DNS a una URL que incluya el repositorio. No se han modificado registros DNS ni ajustes de GitHub desde este trabajo.
4. Esperar propagación y certificado, habilitar **Enforce HTTPS**, y verificar que http y www redirijan a https://edukolea.com/. Canonical, Open Graph, robots y sitemap ya usan esa raíz.
5. Tras desplegar, comprobar respuestas 200 de `/`, `/robots.txt`, `/sitemap.xml`, `/favicon.ico` y `/og-edukolea.png`; revisar enlaces compartidos en redes. Comprobar que no haya `noindex` ni recursos bloqueados. Un build local no verifica DNS, HTTPS ni despliegue público.
6. El responsable debe agregar la propiedad de dominio `edukolea.com` en Search Console, verificar el TXT que Google indique, inspeccionar la URL pública y enviar `https://edukolea.com/sitemap.xml`. Esto no garantiza indexación ni ranking.

Referencias oficiales consultadas: [workflows para Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) y [dominio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Las guías específicas de Next.js están en `node_modules/next/dist/docs/`.

## Recepción del formulario

El formulario envía por POST a `https://formsubmit.co/contacto@edukolea.com`, compatible con la exportación estática y GitHub Pages. No requiere claves públicas ni privadas. El correo visible, los enlaces `mailto:` y el destinatario usan `contacto@edukolea.com`.

Se incluyen servicio, medio preferido, nombre, perfil, institución opcional y correo o teléfono según el medio elegido. Hay validación nativa, consentimiento obligatorio, un campo honeypot y reCAPTCHA habilitado en el proveedor. El visitante pasa a FormSubmit para completar la verificación y ver el resultado. No se muestra un éxito local ni se registra `generate_lead`: un clic o una navegación no prueban entrega al buzón. El formulario también permite enviar por correo sin JavaScript; el selector dinámico de WhatsApp requiere JavaScript y tiene un enlace directo alternativo.

### Activación y prueba de recepción

1. Publicar la exportación y enviar una solicitud de prueba desde el dominio público.
2. Abrir el correo de activación de FormSubmit en **contacto@edukolea.com** (revisar spam) y confirmar el enlace. FormSubmit requiere esta confirmación para comenzar a reenviar solicitudes.
3. Enviar otra solicitud y comprobar la recepción, los datos de todos los campos y la posibilidad de responder al correo del solicitante. Repetir con WhatsApp como medio preferido; los datos llegan al mismo buzón, no se envía un WhatsApp automático.
4. Si falla el proveedor o no llega un mensaje, usar los enlaces directos de correo/WhatsApp y revisar la activación y spam.

La compilación y las comprobaciones locales no verifican activación, existencia del buzón ni entrega real. No se ha realizado un envío externo de prueba en esta revisión.

El aviso describe los datos enviados, su finalidad, el procesamiento mediante FormSubmit y el contacto para consultas o eliminación. Los datos personales no se guardan en sessionStorage ni se envían a analítica. El responsable debe completar los datos organizativos y la conservación de acuerdo con su operación antes del lanzamiento.

Documentación del receptor: [configuración de FormSubmit](https://formsubmit.co/documentation) y [activación y entrega](https://formsubmit.co/help).

## Medición sin datos personales

No se añadió GA4 ni se envían eventos a terceros. Falta Measurement ID, responsable de analítica y definición de consentimiento. Los eventos se implementan como `CustomEvent` local `edukolea:measurement`, con parámetros cerrados:

| Evento | Parámetros | Estado |
| --- | --- | --- |
| `demo_cta_click` | `placement`: hero, nav, service, footer | Clic en CTA a #demo |
| `service_interest_select` | `service_slug`: aula_lista_ia, kolea_en_pares, kolea_reporta | Cambio explícito de servicio |
| `contact_outbound_click` | `contact_method`: email, whatsapp | Clic saliente, nunca lead |
| `generate_lead` | service_slug, contact_method y UTM permitidos | No se emite: el resultado se muestra en el proveedor externo |

Para inspeccionar localmente desde DevTools:

```js
window.addEventListener('edukolea:measurement', ({ detail }) => console.log(detail));
```

Un futuro adaptador a GA4 debe aceptar solo esos parámetros, no el evento DOM completo, URL completa, contenido de formulario, nombre, correo, teléfono, institución ni texto libre. Antes de activar GA4 revisar también su recopilación automática de URL, parámetros y consentimiento.

UTM se conserva en `sessionStorage['edukolea:campaign']` durante la pestaña cuando está disponible. Solo se aceptan `utm_source` instagram/facebook/tiktok/linkedin, `utm_medium` organic_social/paid_social, `utm_campaign` lanzamiento_AAAA_MM y `utm_content` post/reel/story/video/carousel seguido de `_NN`. Se descartan parámetros desconocidos y valores fuera de esos formatos; no se persisten datos del formulario. Un nuevo enlace con códigos válidos reemplaza la atribución anterior; navegar por anclas o recargar sin UTM la conserva. Si el almacenamiento está bloqueado, la landing sigue funcionando. Nada se adjunta a correo/WhatsApp ni se transmite a un receptor todavía.

Ejemplo: `https://edukolea.com/?utm_source=instagram&utm_medium=organic_social&utm_campaign=lanzamiento_2026_10&utm_content=post_01`.
