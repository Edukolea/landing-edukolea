# EduKolea: auditoría de rendimiento

Fecha: 28 de octubre de 2026 (America/Lima).

## Evidencia y condiciones

Se visualizó la captura adjunta y se conservó el JSON recibido en [user-development.json](./user-development.json). Su 69 en Rendimiento y TBT de 1.900 ms provienen de desarrollo: contiene HMR, Next DevTools y React development. No se atribuye su diferencia con producción a las optimizaciones.

Comparación principal: mediana y rango de tres navegaciones por etapa, misma compilación de producción por etapa, misma URL, caché de navegador reiniciada, sin autenticación ni analítica. Servidor de producción previamente iniciado; no representa un arranque frío de Vercel. Ejecuciones secuenciales.

- URL: http://127.0.0.1:3004/
- Lighthouse: 13.6.0
- Navegador: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/156.0.0.0 Safari/537.36
- Viewport: 412 × 823, DPR 1.75
- Perfil: mobile, método simulate, CPU ×4, RTT 150 ms, red 1638.4 Kbps
- CrUX/RUM: no disponible para esta URL local. TBT es una métrica de laboratorio, no INP real.

## Puntuaciones

Mediana (mínimo–máximo), sobre 100.

| Categoría | Inicial producción | Final producción |
|---|---:|---:|
| performance | 98 (96–99) | 93 (84–99) |
| accessibility | 100 (100–100) | 100 (100–100) |
| best-practices | 100 (100–100) | 100 (100–100) |
| seo | 100 (100–100) | 100 (100–100) |

## Métricas

Mediana (mínimo–máximo).

| Métrica | Inicial producción | Final producción |
|---|---:|---:|
| FCP | 1225 ms (1072 ms–1291 ms) | 1208 ms (1137 ms–1393 ms) |
| LCP | 1225 ms (1072 ms–1291 ms) | 1208 ms (1137 ms–1393 ms) |
| TBT | 143 ms (87 ms–215 ms) | 293 ms (87 ms–645 ms) |
| CLS | 0.000 (0.000–0.000) | 0.000 (0.000–0.000) |
| Speed Index | 2603 ms (2550 ms–3088 ms) | 2533 ms (1865 ms–2628 ms) |
| Transferencia total | 232.0 KiB (232.0 KiB–232.0 KiB) | 189.9 KiB (189.9 KiB–189.9 KiB) |
| JavaScript transferido | 165.1 KiB (165.1 KiB–165.1 KiB) | 146.1 KiB (146.1 KiB–146.1 KiB) |
| JavaScript sin usar (estimado) | 51.9 KiB (51.9 KiB–51.9 KiB) | 51.9 KiB (51.9 KiB–51.9 KiB) |

## Diagnóstico y prioridades

1. **JavaScript inicial, prioridad alta:** Lighthouse detectó aproximadamente 52 KiB sin usar en la carga inicial. La inspección del bundle y del import estático confirmó que los diálogos SweetAlert2 se descargaban antes de necesitarse. Se difirió únicamente esa biblioteca hasta el envío del formulario. Se mantienen estilos, mensajes, validación, bloqueo de duplicados y envío SMTP.
2. **Imágenes, prioridad media:** Lighthouse señaló la portada de 640 × 800 y 36.930 bytes como sobredimensionada en celular. Se añadió una variante de 320 × 400 y 13.004 bytes, seleccionada mediante picture/srcset. Se mantienen proporciones, contenedor, colores e ilustración original; carga eager de prioridad alta sin precargar una variante equivocada.
3. **LCP/CLS:** la base de producción ya presenta LCP bajo y CLS cero; no se cambian la composición ni las dimensiones reservadas. Los valores y su variación figuran arriba.
4. **Fuentes:** la página usa Arial/Helvetica y Georgia del sistema; no hay archivos de fuente propios que optimizar ni motivo para introducirlos. YouTube puede cargar sus propias fuentes al mostrar el reproductor.
5. **React y renderizado:** las secciones de contenido siguen siendo Server Components y la interacción está limitada a componentes cliente. No se identificaron componentes anidados que se remonten ni trabajo de cálculo que justifique memoización. Se eliminó trabajo inicial mediante importación condicional; no se afirma una reducción de rerenders sin un perfil que la demuestre.
6. **Animaciones:** se conservaron todas. No se añadieron listeners de scroll ni bibliotecas de animación. Los observadores existentes y la preferencia de movimiento reducido siguen activos.

## Archivos modificados en esta revisión

- app/components/demo-form.tsx: importación condicional de SweetAlert2, errores de carga recuperables y mismo diálogo de carga.
- app/components/sections.tsx: selección responsive de la ilustración.
- app/components/landing.module.css: picture ocupa exactamente el contenedor existente.
- scripts/optimize-images.mjs: generación reproducible de la variante de 320 px.
- public/logo/hero-classroom-320.webp: nueva variante; originales conservados.
- scripts/compare-performance.mjs: comparación reproducible de los seis informes.
- reports/performance/: JSON iniciales/finales, informes HTML, trazas y esta comparación.

No se instalaron dependencias ni se cambió el diseño o la API. Se conservaron los cambios previos del usuario y de las tareas anteriores.

## Verificación

- npm run lint: aprobado.
- npm test: aprobado (cliente, servidor y medición).
- npm run build: aprobado, con TypeScript.
- verify-site sobre la compilación final: aprobado; no se enviaron correos.
- Comprobación manual de diálogos, selección de servicios y video: véase VERIFICACION.md.

## Evidencia reproducible

Los archivos before-1/2/3.report.json y after-1/2/3.report.json contienen los resultados completos, entorno y auditorías. Sus HTML permiten explorar cada ejecución. Los archivos .trace.json y .devtoolslog.json conservan las trazas de carga. comparison.json contiene los números sin redondear.

Regenerar esta comparación: node scripts/compare-performance.mjs.

## Pendientes y límites

- Repetir sobre el dominio desplegado y dispositivos reales; localhost no mide CDN, HTTPS público, Vercel ni conexiones de visitantes.
- La variación entre ejecuciones es real: no atribuir diferencias pequeñas de TBT/LCP a una única causa ni interpretar 100 en Lighthouse como garantía.
- El bundle base de React/Next conserva código sin usar en esta navegación. No se recortó el framework ni se alteraron compatibilidad e hidratación para perseguir una puntuación.
- YouTube puede introducir cookies, fuentes y JavaScript al entrar en pantalla; se conserva la funcionalidad solicitada. Comprobar también el recorrido con video visible.
- La primera apertura de un diálogo requiere descargar su biblioteca; un fallo de red conserva el formulario y muestra el estado de error para reintentar.
- Google Analytics queda pendiente por decisión del usuario. Si se incorpora, repetir medición y revisar privacidad.

## Interpretación de los resultados

La reducción de transferencia inicial es consistente en las tres ejecuciones: 18.2 % del total y 11.5 % del JavaScript. La auditoría de imágenes ya no marca la portada sobredimensionada. La estimación de JavaScript sin usar del framework permanece prácticamente igual; no se atribuyen esos 52 KiB exclusivamente a SweetAlert2.

**No se demostró una mejora global de velocidad:** la mediana de Rendimiento pasó de 98 a 93, y el TBT de 143 ms a 293 ms. El rango final de TBT es amplio y la causa de esa variación no está aislada. Las trazas siguen mostrando tareas largas del documento y del runtime de React/Next. No hay evidencia suficiente para atribuir toda la diferencia al código nuevo ni para descartarla como ruido. Se conserva como asunto pendiente de reproducción y perfilado, sin ocultarlo ni seleccionar solamente el mejor resultado.

Los cambios reducen el peso sin modificar el producto visual, pero no se presenta el objetivo de reducir TBT como resuelto. Siguiente prioridad: perfilado de hidratación/renderizado en un entorno estable, con series alternadas de ambas versiones y sin actividad concurrente; después repetir sobre el despliegue público. No eliminar animaciones ni cambiar la hidratación del formulario sin verificar interacción y accesibilidad.
