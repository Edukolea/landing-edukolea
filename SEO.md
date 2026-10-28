> Actualización de implementación: el despliegue vigente es Next.js en Vercel con Nodemailer y la API /api/contacto/. Las referencias originales a GitHub Pages y receptor externo quedan como antecedente de planificación; consultar README.md para la configuración actual.

# EduKolea: SEO y medición de lanzamiento

## Estado

- **Confirmado:** dominio `edukolea.com`; landing en español; servicio prioritario de creación de sesiones con IA para docentes; alojamiento planeado en GitHub Pages.
- **Hipótesis por validar:** Perú como primer mercado, inferido de SIAGIE y el contacto +51.
- **Pendiente:** nombres finales de servicios, detalle del servicio 1, receptor de formulario, propiedad/etiquetas de GA4 y Search Console, política `www`/raíz, textos legales y recursos OG/favicons finales.
- **Volúmenes de búsqueda:** no verificados. Las frases de abajo son hipótesis semánticas para investigación, no palabras clave con demanda comprobada. No se hizo investigación de volumen con Keyword Planner u otra herramienta.

## Intención y frases candidatas

| Prioridad | Intención | Frases candidatas (sin volumen verificado) |
|---|---|---|
| Principal, servicio 1 | Encontrar herramienta o método para preparar sesiones de aprendizaje con IA; solicitar demostración | crear sesiones de aprendizaje con IA; sesiones de aprendizaje con inteligencia artificial; IA para docentes; herramienta para planificar sesiones de aprendizaje; software para docentes |
| Servicio 2 | Explorar trabajo colaborativo docente y tutores IA | aprendizaje entre pares docentes; crear sesiones de aprendizaje colaborativamente; tutor con inteligencia artificial para estudiantes; agentes de IA para educación |
| Servicio 3 | Buscar apoyo para reportes y procesos educativos/administrativos | reportes estandarizados de aprendizaje; generar reportes educativos con IA; apoyo para SIAGIE con inteligencia artificial; reportes para docentes |
| Institución | Evaluar solución educativa para colegio | plataforma educativa para colegios; herramientas de IA para colegios; software educativo para instituciones |

Mantener el contenido útil y específico. No crear páginas separadas por palabra clave en esta primera versión ni afirmar integración con SIAGIE. Medir impresiones y consultas en Search Console tras publicar antes de decidir si hacen falta páginas por servicio.

## Metadatos y encabezados propuestos

- **Title:** `EduKolea | Crea sesiones de aprendizaje con IA`
- **Meta description:** `Crea sesiones de aprendizaje con apoyo de IA. Conoce EduKolea en una demo para docentes y colegios.`
- **H1 único:** `Crea sesiones de aprendizaje con apoyo de IA`
- **H2:** `Empieza por la sesión de aprendizaje`; `Conoce las otras líneas educativas`; `Conoce la propuesta en una demo`; `Solicita una demo`.
- **Canónica:** `https://edukolea.com/` (decisión propuesta; confirmar que raíz sea el host preferido y redirigir `www` a raíz o viceversa).
- Definir metadatos en el layout o página server del App Router. El HTML inicial debe contener el título, descripción y contenido principal indexable, aunque JavaScript del cliente no cargue. Añadir `lang="es"`, un H1 claro, jerarquía semántica, enlaces rastreables y texto alternativo descriptivo para el logo/imágenes.
- No añadir `noindex` a producción. No bloquear recursos necesarios en `robots.txt`.

## Requisitos técnicos y publicación

El repo usa Next.js 16.4.3 con App Router. Antes de implementar, leer la guía local `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` y las convenciones locales de metadata, robots, sitemap e imágenes. Para GitHub Pages, compilar exportación estática (`output: "export"`) y publicar `out/` desde GitHub Actions. Evitar endpoints de servidor: GitHub Pages no recibe ni procesa envíos del formulario. La exportación estática también requiere prescindir del optimizador `next/image` alojado en servidor por defecto; usar imágenes locales optimizadas/preparadas o un loader externo solo si se justifica.

- **Canonical:** una sola variante HTTPS preferida para todas las señales; canonical absoluto y consistente con `https://edukolea.com/` una vez verificado DNS/HTTPS.
- **`robots.txt`:** permitir rastreo público y declarar `Sitemap: https://edukolea.com/sitemap.xml`. Entregar el archivo en la raíz pública; comprobarlo desde el host final.
- **`sitemap.xml`:** incluir solo la URL canónica pública de la landing al inicio, sin URLs de preview/branch ni parámetros UTM. Generarlo como archivo estático o con la convención compatible de Next.js, confirmar que esté en `out/` y que responda bajo el dominio custom.
- **GitHub Pages y dominio:** configurar dominio propio en Pages; para el apex `edukolea.com`, el proveedor DNS debe apuntar al servicio Pages (GitHub documenta registros A/AAAA o ALIAS/ANAME); configurar opcionalmente `www` con CNAME y elegir redirección. Añadir/verificar dominio antes de cambios DNS y activar HTTPS. Confirmar propagación y certificado antes de abrir indexación.
- **Open Graph:** crear imagen OG de marca (sugerencia 1200×630 px), título y descripción en español; comprobar vista previa de enlaces en redes. Logo existente disponible: `public/logo/logoEdukolea.webp`; no distorsionarlo. Faltan creatividad OG e imágenes reales de producto.
- **Favicon:** reemplazar el favicon de starter por un icono derivado del logo, conservando forma, proporciones y colores; comprobar legibilidad a tamaños pequeños y que la ruta servida sea la de marca.
- **Optimización de imágenes:** servir imágenes locales comprimidas en WebP/AVIF cuando sea posible; declarar dimensiones, incluir `alt`, evitar fondos fotográficos pesados, cargar de forma prioritaria solo el recurso principal visible y lazy-load lo que quede bajo el primer viewport. No inventar capturas de producto.
- **Verificación estática:** inspeccionar `out/index.html` para confirmar texto y metadata; comprobar links, códigos 200 de `/robots.txt` y `/sitemap.xml`, canonical, OG, favicon y URL raíz. Probar la URL pública con URL Inspection una vez desplegada. No asumir que el build local equivale a despliegue ni que enviar el sitemap garantiza indexación.

## Search Console: alta después de DNS/HTTPS

1. En la cuenta Google del responsable, agregar propiedad de dominio `edukolea.com` (sin protocolo ni ruta) y verificarla con el TXT que indique Search Console en el proveedor DNS. Una propiedad de dominio incluye `www` y otros subdominios.
2. Esperar publicación estable en `https://edukolea.com/`; validar la propiedad y usar Inspección de URL para probar la URL publicada y solicitar indexación si corresponde.
3. En **Sitemaps**, enviar `https://edukolea.com/sitemap.xml`; revisar estado y problemas de cobertura/indexación después. El sitemap ayuda al descubrimiento, no garantiza indexación ni ranking.
4. Revisar HTTPS, host canónico, `robots.txt`, URL canónica y ausencia de `noindex`; conservar acceso del responsable de EduKolea.

## UTM y eventos

Etiquetar cada enlace compartido desde redes sociales de forma consistente, por ejemplo:

`https://edukolea.com/?utm_source=instagram&utm_medium=organic_social&utm_campaign=lanzamiento_2026_10&utm_content=post_01`

Valores recomendados: `utm_source` = instagram/facebook/tiktok/linkedin; `utm_medium` = `organic_social` o `paid_social`; `utm_campaign` = `lanzamiento_2026_10`; `utm_content` = formato/variante no personal (por ejemplo `reel_01`, `story_01`). Preservar UTMs durante la visita hasta el envío si el receptor lo permite. No poner nombres, correos, teléfonos ni otros datos personales en una URL o UTM.

| Evento | Disparador | Parámetros permitidos |
|---|---|---|
| `demo_cta_click` | clic en botón “Solicitar una demo” | `placement` (`hero`, `nav`, `service`, `footer`) |
| `service_interest_select` | el usuario elige/cambia servicio en el formulario | `service_slug` con valores controlados (`aula_lista_ia`, `kolea_en_pares`, `kolea_reporta`) |
| `generate_lead` | receptor confirma que la solicitud se guardó/envió correctamente | `service_slug`, `contact_method` (`email`/`whatsapp`) y UTMs permitidos |

No registrar como envío exitoso un clic en enviar, un `mailto:` ni solo abrir WhatsApp. Con un backend/proveedor de formulario estático, emitir `generate_lead` únicamente tras confirmación real; si no se configura receptor, dejar este evento pendiente y medir por separado el clic de contacto saliente. No enviar datos personales a Google Analytics ni a ningún evento. Definir medición y consentimiento aplicable antes de añadir GA4; no se proporcionó Measurement ID.

## Cifras para el contenido: límites de uso

Se encontró una cifra contextual oficial, pero no una cifra localizada para Perú que justifique una promesa de ahorro o impacto. TALIS 2024 reporta que, en promedio entre sus sistemas educativos participantes, la planificación/preparación de lecciones representa 14% del tiempo de trabajo docente; el trabajo administrativo representa aproximadamente 6%. Perú no figura en la lista de los 55 sistemas participantes de esa edición. Por ello, no presentar estas cifras como datos peruanos ni como resultado de EduKolea. Recomendación de lanzamiento: omitirlas del hero; si se usa una en una sección editorial, atribuirla como referencia internacional con año, universo y enlace, y no sugerir que EduKolea ahorra ese tiempo.

## Pendientes previos a publicación

- Aprobar los tres nombres, textos, capacidades y estado de disponibilidad; precisar el entregable demostrable de AulaLista IA.
- Elegir/configurar proveedor receptor del formulario, probar notificación a `contacto@edukolea.com`, decidir si WhatsApp será canal alterno o simultáneo y nombrar responsable de respuesta.
- Confirmar host canónico (raíz o `www`), acceso a DNS/GitHub Pages y titular que verificará Search Console.
- Crear propiedad GA4 si se medirá analítica, entregar Measurement ID y determinar consentimiento/privacidad aplicables. No existe volumen de keywords verificado.
- Diseñar imagen Open Graph y validar favicon a partir de recursos de marca aprobados.

## Fuentes oficiales consultadas

- Next.js, guía local de exportación estática 16.4.3: `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.
- [Next.js: metadata y Open Graph](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots), [sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [imágenes](https://nextjs.org/docs/app/getting-started/images).
- [GitHub Docs: dominio personalizado para Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site), [HTTPS en Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
- [Google Search Console: propiedades y verificación](https://support.google.com/webmasters/answer/34592), [crear y enviar sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [rastreo e indexación](https://developers.google.com/search/help/crawling-index-faq).
- [Google Analytics: eventos recomendados para leads](https://support.google.com/analytics/answer/9267735), [UTM y campañas](https://support.google.com/analytics/answer/10917952).
- [OECD, resultados TALIS 2024 sobre trabajo docente](https://www.oecd.org/en/publications/results-from-talis-2024_90df6235-en/full-report/the-demands-of-teaching_0e941e2f.html), [participantes TALIS](https://www.oecd.org/en/about/programmes/talis.html).
