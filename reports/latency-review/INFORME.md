# Revisión de latencia, reflow y CSS

Fecha: 28 de octubre de 2026, America/Lima.

## Método

Se aplicaron las skills performance y vercel-react-best-practices. Tres cargas móviles iniciales y seis finales (muestra ampliada por variación alta de TBT; todas conservadas), en producción (next build + next start), misma URL y condiciones, navegador con caché reiniciada por Lighthouse y ejecuciones secuenciales. Sin autenticación ni Analytics. Informes JSON/HTML, trazas y registros de red guardados antes de modificar el código. No hay datos CrUX/RUM para localhost.

Condiciones: {"url":"http://127.0.0.1:3005/","version":"13.6.0","browser":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/156.0.0.0 Safari/537.36","screen":{"mobile":true,"width":412,"height":823,"deviceScaleFactor":1.75,"disabled":false},"throttle":{"rttMs":150,"throughputKbps":1638.4,"requestLatencyMs":562.5,"downloadThroughputKbps":1474.5600000000002,"uploadThroughputKbps":675,"cpuSlowdownMultiplier":4},"method":"simulate","storageReset":true}

## Resultados

Mediana (mínimo–máximo). Puntuaciones sobre 100, tiempos en ms, transferencias en bytes y CLS sin unidad. reflowMs representa el total reportado por el insight, no todo el trabajo de layout. Un valor cero significa que el insight no registró un incidente, no ausencia absoluta de reflows.

| Indicador | Antes | Después |
|---|---:|---:|
| performance | 96.0 (91.0–98.0) | 99.5 (77.0–100.0) |
| accessibility | 100.0 (100.0–100.0) | 100.0 (100.0–100.0) |
| bestPractices | 100.0 (100.0–100.0) | 100.0 (100.0–100.0) |
| seo | 100.0 (100.0–100.0) | 100.0 (100.0–100.0) |
| LCP | 1278.5 (1062.2–1448.5) | 1079.6 (921.4–1533.9) |
| TBT | 167.3 (132.4–356.5) | 67.7 (36.5–1003.0) |
| CLS | 0.000 (0.0–0.0) | 0.000 (0.0–0.0) |
| documentLatency | 37.0 (20.0–156.0) | 29.0 (8.0–304.0) |
| stylesheetBytes | 13346.0 (13346.0–13346.0) | 8595.0 (8595.0–8595.0) |
| totalBytes | 194450.0 (194450.0–194450.0) | 189700.0 (189700.0–189700.0) |
| reflowMs | 47.3 (0.0–177.4) | 106.1 (0.0–181.6) |

## Interpretación de los avisos recibidos

- **Latencia del documento de 1.428 ms:** el reporte pegado señala bundles con nombres de desarrollo de Next.js en localhost:3002. Las medidas de producción de esta revisión están en la tabla. No se atribuye la diferencia de entornos a la retirada del CSS. La página ya se prerenderiza y dispone de compresión; no se cambiaron cachés de la API ni encabezados del formulario. Se debe repetir en el dominio público para evaluar Vercel/CDN/red reales.
- **CSS bloqueante:** se confirmó una importación global de sweetalert2.min.css, mientras el módulo sweetalert2.esm.all.js ya inyecta ese mismo CSS cuando se abre un diálogo. Se retiró la importación global redundante. La hoja de diseño de la landing sigue siendo crítica: cargarla tarde provocaría contenido sin estilos y podría introducir CLS. No se promete eliminar toda advertencia de CSS bloqueante.
- **Reflow forzado:** el reporte recibido atribuye la mayor parte a [unattributed] y 3 ms a Next.js. En app/ no se encontraron offsetWidth, offsetHeight, getBoundingClientRect, getComputedStyle, scrollHeight ni scrollWidth. Esto no descarta layout producido por hidratación, estilos, navegador o dependencias. Se conservan trazas y el rango medido; no se presenta como resuelto sin atribución concreta.
- **Preconnect:** Lighthouse no identificó candidatos útiles. No se añadieron preconexiones a localhost ni al reproductor externo antes de necesitarlo.
- **JavaScript legacy:** los polyfills señalados pertenecen al runtime de Next.js. No se modificó node_modules ni se restringió Browserslist para ocultar la advertencia. La guía instalada de Next.js define sus navegadores compatibles; una advertencia informativa no justifica romperlos.

## Cambios

- app/globals.css: retirada de la importación de CSS duplicada; resto de estilos intacto.
- app/components/demo-form.tsx: comentario sobre los estilos incluidos en la importación diferida existente.
- package.json: perf:preview compila y sirve producción en 3005; perf:verify comprueba HTTP 200, metadata y ausencia de los bundles de desarrollo conocidos.
- scripts/verify-production.mjs: guardia para evitar auditar accidentalmente desarrollo. Es una comprobación heurística, no sustituye Lighthouse ni certifica toda configuración de despliegue.
- README.md: pasos para repetir correctamente la auditoría.

Sin dependencias nuevas, cambios en animaciones, diseño o funcionalidades. La biblioteca mantiene sus estilos y se carga al abrir el diálogo.

## Verificación y pendientes

Build/TypeScript, lint, pruebas de cliente/servidor/medición, comprobación de recursos/API y perf:verify pasaron. No se enviaron correos. Los estilos calculados del diálogo y el retorno de foco se verifican en VERIFICACION.md.

No atribuir cambios pequeños de puntuación a una única causa: revisar mediana y rango. Eliminar la duplicación de CSS acredita menor transferencia crítica; no garantiza por sí solo un TBT o LCP menor. El reflow sin atribución y los polyfills del framework quedan documentados. Repetir sobre el despliegue público y perfilar hidratación en un entorno estable antes de modificar animaciones o compatibilidad.

Los archivos before-1/2/3.report.json y after-1/2/3/4/5/6.report.json contienen la evidencia completa. Regenerar: node reports/latency-review/summarize.mjs.

## Lectura de la muestra ampliada

El CSS inicial bajó de 13.346 a 8.595 bytes (35,6 % menos) en todas las ejecuciones. La mediana final de Rendimiento fue 99,5, con rango 77–100, frente a 96 (91–98) inicialmente. LCP: 1.278 → 1.080 ms; TBT: 167 → 68 ms; CLS: 0 en ambas etapas. La latencia de respuesta del documento local fue 37 → 29 ms de mediana, sin haber cambiado la lógica del servidor.

La muestra final se amplió de tres a seis cargas porque las tres primeras tenían mucha variación; todos los resultados se conservaron y comparison.json también muestra la primera serie final. No se compara el 1.428 ms del reporte de desarrollo como si fuera el estado inicial de producción.

El TBT final varió de 36,5 a 1.003 ms y el equipo no estuvo aislado de otros procesos: la menor transferencia crítica es una mejora comprobada; una reducción causal y estable de TBT/LCP requiere más control del entorno. El reflow reportado también varió y no se considera solucionado. No se eliminaron animaciones para mejorar puntuaciones.
