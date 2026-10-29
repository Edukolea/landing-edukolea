# Comprobación del diálogo y del entorno

- Se abrió el diálogo de validación del formulario vacío antes y después de retirar el @import. No se enviaron correos.
- Los estilos calculados coinciden: popup de 512 px, fondo rgb(246,250,242), color rgb(54,78,72), radio 20 px, padding 28px 24px 30px, borde rgb(184,202,177), sombra rgba(30,54,48,.2) 0 25px 100px.
- Título: 27 px. Botón: fondo rgb(99,222,108), radio 7 px, texto 14 px, padding 15px 25px. Icono: 80 px, borde 4 px. Sin cambios respecto al estado inicial.
- El botón «Revisar campo» devolvió el foco al selector con id service.
- perf:verify aceptó producción en 3005 y rechazó el servidor de desarrollo en 3002. La prueba negativa devolvió el error esperado de bundles de desarrollo detectados.
- Build con TypeScript, lint, npm test y verificación HTTP/API de producción aprobados.
- No se retiraron animaciones ni se cambiaron dependencias, navegadores compatibles o estilos de marca.
- Hay otros procesos y un servidor de desarrollo en el equipo. Las condiciones emuladas son iguales, pero no se garantizó aislamiento de la CPU del host. La alta variación de TBT impide atribuir todas las diferencias al cambio de CSS.
- Se amplió la etapa final de 3 a 6 ejecuciones ante la variación alta. Se conservan todos los resultados y la primera serie final por separado en comparison.json.
