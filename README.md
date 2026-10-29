# EduKole

Landing en español para docentes y colegios con Next.js 16.4.3, React 19.3, TypeScript y SweetAlert2. Se despliega como un único proyecto Next.js en Vercel: la página se prerenderiza y `/api/contacto/` funciona como Vercel Function con Node.js. No hace falta un VPS, Express ni un backend desplegado por separado.

## Desarrollo y comprobaciones

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm start
```

`npm start` ejecuta Next.js y su API, no una exportación estática. Para comprobar páginas, recursos, metadata y los rechazos de la API con el servidor iniciado: `VERIFY_URL=http://localhost:3000 node scripts/verify-site.mjs` (en PowerShell, configurar `$env:VERIFY_URL` antes del comando). Sin esa variable el script usa el puerto 3001.

- `npm test` comprueba el contrato cliente/API, validación del servidor, consentimiento, destinatario fijo, Reply-To, TLS, tamaño máximo, origen, límites, fallos SMTP, red y timeout; usa dobles de prueba y no envía correos.
- `npm run smtp:verify` comprueba DNS, certificado TLS y autenticación SMTP con el `.env` local.
- `npm run smtp:verify -- --send-test` también envía un correo técnico a `contacto@edukolea.com`. Comprobar el buzón y spam para verificar la entrega final.
- `.github/workflows/checks.yml` ejecuta lint, pruebas, build y comprobaciones HTTP sin necesitar credenciales SMTP. El despliegue anterior a GitHub Pages se retiró porque ese hosting no puede ejecutar la API.

## Lighthouse: medir producción

Para evitar medir HMR, DevTools y compilación de desarrollo, usar una terminal dedicada:

```sh
npm run perf:preview
```

Esto compila y sirve producción en `http://localhost:3005/`. En otra terminal, ejecutar `npm run perf:verify` antes de abrir Lighthouse sobre esa URL. El verificador rechaza los bundles de desarrollo detectados; no equivale a una auditoría completa. No medir rendimiento con `npm run dev` ni asumir que un puerto concreto garantiza producción.

Los JSON, HTML y trazas de la revisión de CSS y latencia están en `reports/latency-review/`. Los avisos sobre CSS crítico o polyfills no se solucionan eliminando estilos de marca ni recortando compatibilidad sin verificar el resultado.

## Configuración de correo

Configurar estas variables **privadas** en `.env` para desarrollo. `.env.example` contiene solo los nombres y valores públicos de referencia; `.env` y sus secretos están ignorados por Git.

```dotenv
SMTP_HOST=mail.edukolea.com
SMTP_PORT=465
SMTP_USER=contacto@edukolea.com
SMTP_PASSWORD=contraseña_del_buzón
```

El puerto 465 usa TLS desde el inicio; 587 usa STARTTLS obligatorio. No se desactiva la validación de certificados. No usar prefijos `NEXT_PUBLIC_` para estas variables. Si la contraseña contiene `$`, Next.js requiere escaparlo como `\$` en los archivos `.env`; no se cambia la contraseña real del buzón. No compartir credenciales en el chat, capturas ni repositorio.

El remitente es el usuario SMTP autenticado. El destinatario está fijado en el servidor a **contacto@edukolea.com**, independientemente de lo que envíe el navegador. Si el visitante elige correo, su dirección se usa como Reply-To para responder directamente; si elige WhatsApp, se incluye su número en el cuerpo sin enviar un WhatsApp automático.

El correo incluye nombre, perfil, institución opcional, servicio, medio preferido y datos de contacto. El cuerpo es texto plano, se rechazan caracteres de control y no se aceptan remitentes, destinatarios, asuntos ni adjuntos elegidos por el cliente.

## Publicar en Vercel

1. Importar o conectar este repositorio como un proyecto **Next.js** en Vercel.
2. Usar `npm run build` y dejar **Output Directory en el valor predeterminado de Next.js**. Quitar cualquier override `out`; ya no se utiliza `output: "export"`.
3. En **Project → Settings → Environment Variables**, agregar `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` y `SMTP_PASSWORD` para Production y los entornos Preview que vayan a enviar correos. Copiar los valores del `.env` por un canal privado. El `.env` local no se sincroniza a Vercel mediante Git.
4. Desplegar de nuevo después de guardar las variables. La ruta declara runtime Node.js y duración máxima de 60 segundos; no usa Edge ni procesos de correo en segundo plano.
5. Agregar `edukolea.com` al proyecto y aplicar los registros web que indique Vercel. **Conservar los registros de correo MX, mail, SPF y DKIM del proveedor actual**: cambiar el hosting web no requiere cambiar el proveedor de correo. Los antiguos archivos CNAME/.nojekyll de Pages no configuran Vercel.
6. Desde la URL publicada, completar y enviar el formulario. Revisar el mensaje real en `contacto@edukolea.com`, el asunto y Reply-To, además de spam. La cuenta SMTP debe permitir conexiones desde Vercel.

No se han publicado cambios ni modificado ajustes de una cuenta Vercel desde este trabajo: el checkout no está enlazado a un proyecto Vercel y no hay CLI/conector Vercel configurado en este entorno. Estos pasos completan el despliegue sin crear un servidor aparte.

## Flujo y protección del formulario

`Navegador → POST /api/contacto/ → Nodemailer → SMTP → contacto@edukolea.com`

SweetAlert2 conserva las validaciones, carga, confirmación y errores de marca. El cliente bloquea envíos simultáneos, espera hasta 45 segundos y conserva todos los campos si hay un fallo. No se reintenta automáticamente: un corte de conexión no prueba que el correo haya sido descartado. Se limpian los datos únicamente con HTTP exitoso, `success: true` y un identificador de mensaje, devueltos solo después de que SMTP acepte al destinatario. Esto acredita aceptación del servidor de correo, no lectura ni llegada a la bandeja principal.

La API admite solo POST JSON del mismo origen, limita el cuerpo a 8 KiB y valida todos los campos, el servicio permitido, consentimiento y honeypot. Rechaza errores sin exponer respuestas SMTP, credenciales ni datos personales. Incluye un límite de 5 peticiones cada 10 minutos por dirección IP anonimizada en cada instancia activa. Este límite es orientativo y se reinicia al crear instancias: para un límite compartido entre todas las instancias, configurar las reglas del Vercel WAF. No hay base de datos ni almacenamiento de solicitudes en este proyecto.

## Resultado verificado

Con el `.env` local, DNS, TLS y autenticación SMTP pasaron. El servidor SMTP aceptó un correo técnico directo y una solicitud real enviada desde el formulario de la landing, sin redirecciones. La confirmación se mostró tras la respuesta real del backend y se limpiaron los campos. No se inspeccionó el buzón; queda confirmar allí la entrega final y repetir la prueba en el despliegue Vercel.

## Contenido y medición

Se mantienen identidad visual, Servicios con preselección y detalles accesibles, Nosotros y los tres logos originales de Aliados. AulaLista IA está disponible para demo; las otras líneas conservan su alcance/disponibilidad por confirmar. Las animaciones respetan movimiento reducido. Los eventos son locales, sin Google Analytics ni datos del formulario. Las UTM permitidas se conservan en sessionStorage y no se incluyen en los correos.

Referencias: [SMTP en Vercel](https://vercel.com/kb/guide/serverless-functions-and-smtp), [Nodemailer SMTP](https://nodemailer.com/smtp) y guías locales de Next.js en `node_modules/next/dist/docs/`.
