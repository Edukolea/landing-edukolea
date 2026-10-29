# Verificación funcional y visual

- Producción local: http://localhost:3004/.
- Se envió el formulario vacío desde la interfaz: se descargó SweetAlert2 y apareció el diálogo «Revisa tus datos», con el mensaje de servicio obligatorio.
- Al cerrar el diálogo, el foco volvió a «Servicio de interés».
- El enlace «Conocer AulaLista IA» seleccionó AulaLista IA en el formulario.
- Se comprobó que el reproductor de YouTube sigue cargando dentro de la sección del MVP. La reproducción ya había sido verificada en la revisión previa; en esta revisión no se modificó el reproductor.
- No se envió una solicitud válida ni un correo real.
- Las pruebas automatizadas comprueban validación, confirmación SMTP, respuestas fallidas, timeout, orígenes y medición. No sustituyen una prueba real de entrega de correo.
- El contenedor de la ilustración mantiene sus dimensiones. picture ocupa el 100 % del contenedor existente y conserva object-fit: contain; no se cambiaron colores, tipografías, espaciados, textos o keyframes.
- Se conservaron capturas de Lighthouse de cada etapa para inspección visual. Las animaciones continúan activas y pueden aparecer en fases diferentes entre capturas.
