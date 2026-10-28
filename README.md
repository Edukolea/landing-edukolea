# EduKolea

Primera landing en español para docentes y colegios. Next.js 16.4.3, React 19.3, App Router y TypeScript, con CSS Modules y variables de marca. Se añadió SweetAlert2 para las alertas accesibles y personalizadas del formulario. Se leyeron completos LANDING_BRIEF.md y SEO.md y las guías locales de exportación, metadata, robots, sitemap, iconos, imágenes y CSS antes de implementar.

## Desarrollo y verificación

Revisión del 28 de octubre de 2026: se conservaron el logo y la paleta, se renovaron portada y Servicios, y se añadieron Nosotros y Aliados. El formulario usa AJAX con SweetAlert2 y dirige las solicitudes a contacto@edukolea.com.

La exportación se revisó en navegador a 1280, 768, 390 y 320 px, sin desbordamiento horizontal ni imágenes faltantes. Se probaron preselección, detalles con toque y Enter, validación con foco al campo, cambios de canal y alertas simuladas de carga, recepción, activación y rechazo. Las respuestas simuladas conservaron los datos ante fallos y no navegaron fuera de la página. Lint, build y los tres scripts de verificación pasan.

**Límite externo observado:** el intento real desde navegador no obtuvo confirmación; una comprobación HTTP directa al endpoint también agotó el límite de 20 segundos. La landing mostró error y conservó los datos. No se puede acreditar activación ni entrega al buzón desde este entorno; repetir la prueba desde el dominio publicado y confirmar el enlace de activación si FormSubmit lo solicita. No se modificaron DNS ni se publicó el sitio.

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

## Formulario AJAX y activación

El formulario usa `fetch` con JSON y POST a `https://formsubmit.co/ajax/contacto@edukolea.com`. No navega a FormSubmit. Requiere JavaScript; antes de la hidratación los campos están bloqueados para evitar envíos accidentales o datos personales en la URL. Sin JavaScript se ofrecen correo y WhatsApp.

SweetAlert2 muestra validación, carga, recepción confirmada, activación pendiente y errores con los colores de EduKolea. La validación usa las restricciones HTML de los campos y lleva el foco al primer campo inválido al cerrar la alerta. Se exige consentimiento, se conserva un honeypot y no se desactiva la protección del proveedor. Se bloquean envíos duplicados con una referencia síncrona y campos deshabilitados. Hay un límite de 20 segundos; no se reintenta automáticamente, porque un timeout no prueba que el proveedor haya descartado la solicitud.

La recepción solo se confirma con HTTP exitoso, JSON válido, `success` igual a `true` o `"true"` y un mensaje explícito de formulario enviado (`successfully submitted`). Los mensajes de activación o verificación se tratan por separado, incluso si incluyen `success: true`. Un 200 vacío, HTML, una respuesta desconocida o un rechazo nunca muestran éxito. Solo se limpian los campos tras ese acuse; errores y activación pendiente conservan los datos en la página. Los datos no se guardan en localStorage/sessionStorage ni se registran en analítica. No se emite `generate_lead`: el acuse del proveedor no acredita entrega al buzón.

### Activación del correo receptor

1. Publicar y enviar una solicitud de prueba desde `https://edukolea.com/`.
2. El responsable de **contacto@edukolea.com** debe abrir el correo de activación de FormSubmit (revisar spam) y confirmar el enlace. Una alerta de SweetAlert2 no activa ni verifica el buzón.
3. Enviar otra solicitud y comprobar en el buzón los datos y el Reply-To cuando el visitante elige correo. Repetir con WhatsApp como preferencia: la solicitud llega al mismo correo; no se envía un WhatsApp automático.
4. Si hay un error o un corte de conexión, conservar los datos, revisar activación/conexión y reintentar; también están los enlaces directos.

El build y las pruebas simuladas no verifican DNS, existencia del buzón, activación ni entrega de correo. El aviso explica datos, finalidad, proveedor y contacto para consultas; el responsable debe completar los datos organizativos y la conservación según su operación.

Documentación: [AJAX de FormSubmit](https://formsubmit.co/ajax-documentation), [activación](https://formsubmit.co/help) y [SweetAlert2](https://sweetalert2.github.io/).

## Interacciones y comprobaciones

- Servicios: tres tarjetas apiladas en escritorio; en móvil se muestran en flujo normal. Los detalles usan `details/summary`, operables con toque, Enter y Espacio. Cada CTA preselecciona su servicio y lleva el foco al selector. AulaLista IA está disponible para demo; las otras líneas conservan su alcance y disponibilidad por confirmar.
- Nosotros: propósito y principios sin cifras ni logros inventados. Aliados: únicamente los tres PNG adjuntos, conservados sin alteraciones (OEA, AWS e Incuba Centro).
- Las entradas usan IntersectionObserver; sin JavaScript el contenido sigue visible. La preferencia de movimiento reducido elimina entradas, animaciones, scroll suave y apilamiento fijo.
- `node scripts/verify-demo.mjs`: contrato de respuesta, destinatario, payload, activación, JSON inválido, rechazos HTTP, errores de red y timeout sin solicitudes externas.
- `node scripts/verify-export.mjs`: HTML, metadata, anclas, controles previos a hidratación, CTAs y los tres logos.
- `node scripts/verify-measurement.mjs`: atribución permitida e instrumentación sin datos personales.

Para reproducir los estados en navegador: ejecutar `node scripts/qa-preview.mjs` tras el build y abrir `http://localhost:3001/?qa=success#demo`. Las opciones son `success`, `activation`, `rejected`, `invalid-json`, `http-error`, `network-error` y `timeout`. El servidor inyecta respuestas simuladas solo al usar esos parámetros y muestra una etiqueta de prueba; nunca modifica `out/`. Sin `?qa=` sirve la exportación original con el receptor real. No publicar el servidor de QA.

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
