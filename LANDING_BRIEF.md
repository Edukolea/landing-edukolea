> Actualización de implementación: el despliegue vigente es Next.js en Vercel con Nodemailer y la API /api/contacto/. Las referencias originales a GitHub Pages y receptor externo quedan como antecedente de planificación; consultar README.md para la configuración actual.

# EduKole: brief de landing

**Objetivo:** captar solicitudes de demo desde redes sociales y publicar una primera versión antes del viernes 30 de octubre de 2026. La meta operativa es publicar a más tardar el jueves 29.

## Decisiones y estado

### Confirmado por el usuario

- Marca: EduKole; dominio: `https://edukolea.com`.
- Público usuario: docentes. El colegio contrata; puede pagar el colegio o el docente.
- Hay tres líneas de servicio. Solo el servicio de creación de sesiones con IA se puede entregar hoy.
- Los tres servicios deben aparecer; la creación de sesiones es la prioridad visual y de contenido.
- Contactos: `contacto@edukolea.com` y WhatsApp `+51 906 815 008`.
- Alojamiento: GitHub Pages con el dominio propio.
- Stack existente: Next.js 16.4.3, React 19.3, App Router, TypeScript y Tailwind CSS 4. Se pide arquitectura modular y no usar Tailwind como única solución de estilos.
- Logo disponible: `public/logo/logoEduKole.webp`. Conservar forma, proporciones y colores.
- Paleta solicitada: `#364E48`, `#F6FAF2`, `#D4D3CB`, `#ABB1AB`, `#63DE6C`.

### Propuestas para validar; no son decisiones comerciales aprobadas

- **Público prioritario para el mensaje:** docentes que preparan sesiones de aprendizaje; dirigir el mensaje también a directivos/colegios como compradores. Se deriva de que docentes usan el producto y el primer servicio está disponible.
- **Nombres creativos provisionales:** 1) **AulaLista IA**, 2) **Kolea en Pares**, 3) **Kolea Reporta**. Confirmar nombres antes de publicación.
- **Alcance de las líneas 2 y 3:** disponibilidad, entregables y alcance técnico pendientes. En particular, “apoyo para SIAGIE” no debe describirse como integración con SIAGIE.
- **Forma de recibir el formulario:** falta elegir y configurar el receptor técnico. GitHub Pages solo aloja archivos estáticos; este repo no tiene backend ni proveedor de formularios configurado.
- **Territorio comercial:** Perú es una hipótesis por el dominio de SIAGIE, el número +51 y el correo; confirmar alcance geográfico si importa para la oferta.

## Oferta para esta primera versión

### Servicio destacado: AulaLista IA (nombre provisional)

- **Público:** docentes; el colegio o docente puede contratar/pagar.
- **Problema expresado por el usuario:** ayudar al docente a crear sesiones de aprendizaje.
- **Entrega que se puede ofrecer hoy:** creación de sesiones de aprendizaje con apoyo de IA. El formato exacto, niveles, áreas, revisión docente y límites deben demostrarse y confirmarse; no prometerlos en el texto.
- **Propuesta de valor:** “Crea sesiones de aprendizaje con apoyo de IA y dedica más tiempo a acompañar a tus estudiantes.” Es una propuesta de comunicación, no una afirmación de ahorro medido.

### Servicio 2: Kolea en Pares (nombre provisional)

- **Público:** docentes (confirmado como usuario común de la solución).
- **Alcance conocido:** desarrollar sesiones de aprendizaje entre pares y usar agentes como tutores.
- **Problema y entregable concreto, disponibilidad y formato:** pendientes de confirmar.

### Servicio 3: Kolea Reporta (nombre provisional)

- **Público:** docentes y colegios (usuario/comprador común informado por el usuario).
- **Alcance conocido:** reportes estandarizados y apoyo para SIAGIE con IA.
- **Problema específico, entregable, disponibilidad, formatos y relación técnica con SIAGIE:** pendientes. No afirmar carga automática, sincronización ni integración.

## Estructura y textos para la página

Una página, en español, de lectura móvil. Navegación con enlaces a Servicios y Solicitar demo. Repetir una sola acción principal: **“Solicitar una demo”**.

### 1. Portada

**Eyebrow:** EduKole para docentes y colegios
**H1:** Crea sesiones de aprendizaje con apoyo de IA
**Texto:** Prepara sesiones para tu aula con EduKole. Conoce en una demo cómo funciona la creación de sesiones con IA y explora también las otras líneas educativas de EduKole.
**Botón:** Solicitar una demo
**Apoyo breve:** Para docentes y colegios.

### 2. Servicio prioritario

**H2:** Empieza por la sesión de aprendizaje
**Título de tarjeta:** AulaLista IA · nombre provisional
**Texto:** Crea sesiones de aprendizaje con apoyo de inteligencia artificial y adapta cada propuesta a las necesidades de tu aula.
**Disponibilidad:** Disponible para demo; validar exactamente qué se puede entregar hoy.
**Botón:** Solicitar una demo

### 3. Las otras dos líneas

**H2:** Una propuesta educativa que acompaña más momentos del trabajo docente

- **Kolea en Pares · nombre provisional:** Desarrollo de sesiones de aprendizaje entre pares, con agentes que pueden actuar como tutores. Alcance y disponibilidad por confirmar.
- **Kolea Reporta · nombre provisional:** Reportes estandarizados y apoyo para tareas relacionadas con SIAGIE mediante IA. Alcance y disponibilidad por confirmar; no es una promesa de integración.

### 4. Cómo conocer EduKole

**H2:** Conoce la propuesta en una demo
**Pasos:** 1) Cuéntanos qué servicio te interesa. 2) Elige cómo prefieres que te contactemos. 3) El equipo de EduKole coordinará contigo una demostración.
No afirmar que la demo es automática, inmediata o personalizada hasta confirmar el proceso y la capacidad de atención.

### 5. Formulario

**H2:** Solicita una demo
**Texto:** Cuéntanos quién eres y qué te interesa. Te contactaremos por el medio que elijas.
**Campos mínimos:** nombre; perfil (docente/directivo/otro); institución (opcional para docente independiente); servicio de interés (obligatorio: las tres opciones provisionales); medio de contacto preferido (correo/WhatsApp); correo o teléfono según el medio elegido.
**Botón:** Solicitar una demo
**Éxito solo tras confirmar recepción:** “¡Gracias! Recibimos tu solicitud. EduKole se pondrá en contacto contigo por el medio que elegiste.”
**Error:** “No pudimos enviar la solicitud. Inténtalo de nuevo o contáctanos por correo o WhatsApp.”
**Contactos de respaldo:** `mailto:contacto@edukolea.com` y enlace `https://wa.me/51906815008`.

### 6. Pie

**Texto:** EduKole · Soluciones educativas para docentes y colegios.
Enlaces: correo, WhatsApp y aviso de privacidad. El aviso y el texto de consentimiento deben validarse antes de recoger datos personales.

## Formulario y recorrido de la solicitud

1. Visitante llega desde red social; conservar UTM de origen durante el recorrido.
2. Completa los campos mínimos y elige uno de los tres servicios.
3. El formulario debe enviar los datos a un receptor verificado que notifique a `contacto@edukolea.com`; definir si WhatsApp es canal alterno o simultáneo.
4. Mostrar confirmación solo cuando el receptor confirme el envío. El responsable de revisar y responder solicitudes aún debe nombrarse.
5. En caso de error, ofrecer los dos enlaces directos de contacto.

**Bloqueo para envío real:** elegir y configurar un proveedor/endpoint compatible con hosting estático (o implementar un servicio externo autorizado). No simular envío ni registrar `generate_lead` al hacer clic. La selección de proveedor, acceso/alta y responsable de seguimiento quedan pendientes.

**Privacidad:** no enviar nombre, email, teléfono, institución ni texto libre a analítica. Publicar un aviso de privacidad y confirmar el consentimiento adecuado antes del lanzamiento.

## Identidad visual y recursos

- Usar el logo existente sin alterar su dibujo, paleta ni relación de aspecto. El archivo local es cuadrado WebP de 64,960 bytes; puede servir en la marca y como imagen base para icono si conserva legibilidad.
- **Contraste calculado WCAG:** `#364E48` sobre `#F6FAF2` = 8.49:1; sobre `#D4D3CB` = 5.97:1. Adecuado para texto normal. `#63DE6C` sobre `#F6FAF2` = 1.63:1; usarlo como acento/fondo de botón con texto `#364E48`, no como texto pequeño. `#ABB1AB` sobre `#F6FAF2` = 2.07:1; reservarlo para decoración, bordes o elementos no esenciales. Verificar combinaciones finales de controles y foco.
- Estilo: moderno, cercano, educativo y profesional; contenido legible en móvil, foco visible y controles cómodos para tocar.
- **Disponible:** logo. **Faltante:** imagen social Open Graph diseñada con la marca; favicon de marca verificado (el actual es el de starter); capturas o imágenes reales de AulaLista IA. No fabricar capturas, testimonios ni marcas de clientes.
- No se proporcionaron testimonios, clientes, precios, resultados ni métricas propias. No inventarlos.

## Arquitectura y publicación para el agente

- Mantener App Router, TypeScript y dependencias existentes; no instalar nada sin una necesidad demostrada.
- Componentizar navegación, portada, tarjetas de servicios, formulario y pie. Mantener el contenido en módulos pequeños y usar CSS Modules y/o CSS propio con las variables de marca; Tailwind puede convivir, pero no debe ser la única capa de estilos.
- El destino es GitHub Pages. La guía local de Next.js 16.4.3 indica configurar `output: "export"`; `next build` produce `out/`. No usar funciones que necesiten servidor (Server Actions, API/Route Handlers dinámicos, cookies ni optimización de imágenes de servidor por defecto). Verificar los flags existentes en `next.config.ts` y el resultado del build antes de configurar Actions.
- Como se usará dominio propio (`edukolea.com`), configurar Pages y DNS para dominio raíz, decidir redirección entre raíz y `www`, añadir `CNAME` donde corresponda y habilitar HTTPS. La URL canónica propuesta es `https://edukolea.com/`.
- Ventana solicitada: primera versión publicada antes del viernes 30 de octubre de 2026; falta confirmar responsables de DNS, Search Console, analítica y recepción de leads.
