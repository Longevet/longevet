# Auditoría final de LONGEVET

## Dictamen

La arquitectura corresponde al servicio confirmado: atención programada a domicilio, coordinación por WhatsApp y ausencia de cuentas, pagos o reservas automáticas en el sitio. La prioridad siguiente es publicar de forma controlada y verificar el funcionamiento real en teléfonos y en el dominio definitivo. No recomiendo añadir más secciones o animaciones en esta etapa.

Esta revisión se hizo sobre el código, el HTML generado y las dependencias instaladas. No hubo acceso al navegador local: el control de acceso de la aplicación lo rechazó, incluso después de que la configuración visible mostrara el sitio permitido. Por instrucción del usuario, la comprobación móvil se basa en la implementación versionada. No se afirma que se hayan realizado capturas, Lighthouse, pruebas táctiles ni una certificación WCAG en esta revisión.

## Cambios realizados

| Área | Hallazgo y corrección |
| --- | --- |
| Contenido inicial | `Reveal` enviaba `opacity:0` desde el servidor. Se sustituyó por contenido visible y una animación CSS opcional; ahora el mensaje y el contacto no esperan la hidratación. |
| Rendimiento | Se retiraron del inicio la dependencia de animación de `ux-details` y el sistema global de notificaciones sin llamadas en el sitio. Las guías y descargas se cargan al abrir sus paneles. |
| Imágenes | Se añadieron anchos de 320, 384 y 480 px al optimizador, se ajustó `sizes` de la portada y se quitó la prioridad de la imagen del footer. Se conservan AVIF/WebP automáticos y la prioridad del retrato principal. |
| Optimización segura | El optimizador acepta únicamente `/images/**`, sin parámetros en la ruta fuente y con calidad permitida 75. No se habilitan SVG arbitrarios ni imágenes remotas. |
| Navegación | Se eliminó la suma de `scroll-padding` y `scroll-margin` que desplazaba demasiado las secciones. El encabezado puede crecer con el texto. El menú conserva desplazamiento en pantallas de poca altura. |
| Tarifas | Pestañas de al menos 48 px, nombre completo de Laboratorio, tarjetas móviles que permiten reorganizar nombre/precio, etiquetas destacadas también en móvil y encabezados de columna con `scope`. |
| Planes | Precio y sufijo pueden pasar a otra línea. Botones admiten texto ampliado y mantienen su icono sin encoger. Se conserva el plan destacado y toda la información comercial confirmada. |
| Formulario | Menor padding anidado, campos de 16 px y foco sobre errores de validación. La barra fija se oculta mientras se enfoca un campo para dejar sitio al teclado. |
| Privacidad sin JavaScript | Los campos permanecen deshabilitados hasta hidratar. Así se evita que el envío nativo del formulario comunique datos al alojamiento mediante un GET. Hay explicación sin JavaScript y contacto directo de WhatsApp. |
| Accesibilidad | Contacto, redes y enlaces legales del footer tienen áreas táctiles mayores. El salto al contenido puede enfocar las páginas legales. El estado de horario no trunca su texto. Se oscureció el rojo de errores para mejorar su contraste sobre fondos claros. |
| Entrevistas | YouTube usa privacidad mejorada; no se carga ningún iframe hasta un clic. Ambas miniaturas tienen alternativa ante fallos. Las peticiones de miniaturas no envían la cabecera Referer; los reproductores conservan la referencia necesaria para funcionar. |
| Legal | Se explica la conexión con terceros y el alcance del modo de privacidad mejorada. Se añadió el domicilio administrativo autorizado: Quebradilla, Cartago, Costa Rica, sin presentarlo como local de atención. |
| SEO social | Vista previa propia de 1200 × 630 px, con doctora, servicio y cobertura, de unos 76 KB frente al retrato original de 1,97 MB. Se actualizó Open Graph y Twitter. |
| Datos estructurados | Se evitó duplicar el nombre comercial y se retiraron valores inventados de especialidad médica. Se conserva el escape de JSON-LD y no se añaden valoraciones ni cifras sin respaldo. |
| Disponibilidad | Páginas de 404, error de aplicación, error del layout y mantenimiento, con contacto directo. Mantenimiento planificado configurable por variable, respuesta 503, `Retry-After`, sin caché y sin indexación. |
| Código de ejemplo | Se retiró la ruta `/api` que solo devolvía Hello world. El sitio no necesita una API pública para coordinar citas. |
| Mantenimiento del código | Se corrigieron dos errores del análisis completo en los componentes reutilizables de móvil y carrusel: suscripciones a estado externo y limpieza de eventos. Se corrigió el README, que describía reservas, códigos y cancelaciones inexistentes. |

## Revisión móvil del código

Se revisaron los comportamientos definidos para 320–639, 640–767, 768–1023, 1024–1279 y 1280 px o más. Estos son límites CSS y análisis de la estructura; no son mediciones de renderizado en esos dispositivos.

| Elemento | Comportamiento comprobado en implementación | Prueba real pendiente |
| --- | --- | --- |
| Portada | Una columna antes de 1024 px, título adaptable, acciones con salto de línea, fotografía proporcionada y contenido visible antes de JavaScript. | Primera pantalla con Safari/Chrome, textos al 200 % y red lenta. |
| Encabezado | Marca con ancho flexible, menú de 48 px, altura mínima que permite crecer y panel desplazable. | Apertura/cierre táctil, posición tras elegir una sección, foco y modo horizontal. |
| Tarifas | Lista de tarjetas por debajo de 640 px; tabla desplazable desde 640 px. Las cuatro categorías conservan etiquetas legibles. | Lectura con letra ampliada y cambio de categorías con lector de pantalla. |
| Planes | Una columna antes de 768 px, dos desde 768 y cuatro desde 1024. CTA con altura mínima y salto de texto. | Comparación de los cuatro planes y tiempo hasta encontrar la opción adecuada. |
| Formularios | Campos sin ancho mínimo fijo, texto de 16 px, grupos separados, fechas validadas en Costa Rica y consentimiento antes de preparar el mensaje. | Teclados de iOS/Android, fecha/hora nativos, retorno desde WhatsApp y recuperación si una ventana se bloquea. |
| Galería | Deslizamiento nativo con snap, indicadores, teclado y diálogo de imagen con altura máxima dinámica. | Gestos táctiles, retorno del foco, legibilidad y cierre con lector de pantalla. |
| Historias | Carrusel manual sin avance automático, flechas de 44 px, indicadores y anuncio de posición. | Cambio de orientación mientras se lee y navegación asistida. |
| Barra inferior | Ancho flexible, área segura inferior, espacio reservado según su altura real (incluido texto ampliado) y ocultación con foco en campos. | Teclado virtual, barras del navegador y teléfonos con área segura. |
| FAQ/recursos | Cinco respuestas iniciales, explorador opcional y recursos diferidos al desplegar. | Carga diferida bajo conexión intermitente. |
| Páginas legales/error | Contenido de una columna, texto envolvente, contacto directo y controles amplios. | Foco, contraste completo de estados y zoom. |

Se permiten zoom y ajuste de texto; no se añadió `maximum-scale` ni `user-scalable=no`. El objetivo de diseño es contenido adaptable a 320 CSS px, siguiendo [W3C Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). Los controles principales buscan 44–48 px; esto no es una declaración de conformidad de toda la página.

## Seguridad y dependencias

Antes de actualizar, npm detectó nueve entradas vulnerables, incluida una crítica en Next.js. Se actualizaron Next.js y eslint-config-next a 16.3.8, Sharp a 0.35.5 y dependencias transitivas con correcciones compatibles.

Resultado posterior:

- `npm audit --omit=dev`: **cero avisos conocidos en las dependencias de producción** en la consulta de esta revisión.
- Auditoría completa: **cinco entradas de severidad alta** en una misma cadena de desarrollo: eslint-config-next → plugin de Next → fast-glob → micromatch → braces. El aviso de braces no publica una versión corregida. No se aplicó el downgrade incompatible a Next 14 propuesto por `audit fix --force`. Revisar de nuevo cuando exista una corrección; no ejecutar estas herramientas sobre patrones de terceros no confiables.
- La presencia del antiguo aviso crítico de ImageResponse no demuestra que esta web tuviera una vía explotable: el código no usa ImageResponse con entradas de visitantes. La actualización elimina igualmente la dependencia afectada.

Referencias: [aviso de ImageResponse](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j), [corrección del optimizador de imágenes](https://github.com/advisories/GHSA-cjq9-62q9-8jv4), [Sharp](https://github.com/advisories/GHSA-wq5f-xc86-pv6w), [braces sin parche publicado](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

Las entradas del formulario son texto, no HTML ejecutable. Se validan tipo, longitud, opciones, fechas, horario, caracteres de control y consentimiento. El destinatario de WhatsApp es fijo y el texto se codifica como un único parámetro. El JSON-LD escapa el delimitador HTML. No hay endpoint de reservas, SQL, sesión o carga de archivos de visitantes en esta implementación.

La CSP restringe orígenes, objetos y marcos externos y se mantienen nosniff y permisos de cámara/micrófono/geolocalización desactivados. Sigue permitiendo scripts y estilos inline por la generación estática y el tema; por tanto, no equivale a una defensa completa contra XSS. No se hicieron pruebas de penetración ni se verificó la infraestructura pública.

El error `triggerTranslation` de `inject.js` no aparece en el código del sitio. El uso de `className.indexOf` falla sobre SVG porque `className` puede ser un objeto. Esto es consistente con un traductor o script inyectado, pero no se pudo identificar su origen desde el navegador. Para confirmarlo, revisar la URL del archivo en DevTools: un origen de extensión confirmaría esa procedencia. Una página de error de React no captura necesariamente errores de extensiones.

## Rendimiento: evidencia y límites

Inventario intermedio de scripts referenciados por el HTML de inicio: 281,5 KiB gzip. Tras retirar los componentes sin uso y diferir los recursos: 236,0 KiB gzip, una reducción cercana al 16 %. El HTML pasó de 268,8 a 249,7 KiB sin compresión. Comparación entre compilaciones de esta revisión, no con una medición del sitio previamente desplegado.

Estos valores no incluyen todas las respuestas RSC, imágenes, fuentes o módulos cargados después. No son mediciones de LCP, INP o CLS. El script `scripts/audit-bundle.mjs` permite repetir el inventario; medir Core Web Vitals sobre el dominio real es un pendiente de publicación.

Los PNG originales pesan alrededor de 2 MB, pero Next entrega variantes AVIF/WebP de las imágenes utilizadas por `next/image`, según el navegador y la cabecera Accept. No es necesario convertir a mano todas las fotos para obtener esas variantes. Mantener nombres nuevos cuando se reemplace una imagen ayuda a evitar versiones antiguas en caché. Los PDFs se descargan bajo demanda y no se precargan.

## Legalidad, cookies y contenido

Fotos, logo y PDFs se consideran propios según la confirmación del usuario. Se conserva la atribución de los medios, los enlaces a sus fuentes y los reproductores oficiales. El usuario confirmó que el video de YouTube pertenece al medio o a una cuenta autorizada. También confirmó la autorización familiar para las historias; los textos la indican.

El modo de privacidad mejorada de YouTube limita la personalización asociada a la reproducción; no elimina todo tratamiento de datos. Las miniaturas conectan con terceros antes de pulsar reproducir; los reproductores se cargan después del clic. Mantener la información de privacidad junto a las entrevistas y en la política. [Explicación oficial de YouTube](https://support.google.com/youtube/answer/171780?hl=en).

No se añadió un banner genérico de cookies: la web no incorpora analítica publicitaria ni píxeles propios, y el tema usa almacenamiento local. Esto no equivale a ausencia de tecnologías de terceros ni a una exención legal universal. Si se añaden anuncios, métricas de marketing o se amplía el público a jurisdicciones con requisitos de consentimiento previo, evaluar y configurar sus controles antes de activar esas herramientas.

La política identifica responsable, contacto, domicilio administrativo autorizado, finalidad, campos opcionales, proveedores externos, comunicación, conservación por finalidad y derechos. La [Ley 8968, artículo 5](https://formatos.inamu.go.cr/SIDOC/DOCS/ley_8968.pdf) es una referencia para la información y autorización al recolectar datos. Una localidad administrativa no garantiza por sí sola que se hayan cumplido todas las obligaciones sobre identificación y dirección: confirmar que permite localizar al responsable para solicitudes o notificaciones. La revisión técnica no determina obligaciones de registro, retención clínica o tributarias de la actividad profesional.

Conservar los respaldos de autorización familiar y procedencia de las entrevistas, y un procedimiento para atender solicitudes de retirada o acceso. Los precios y planes se mantienen tal como fueron confirmados; conviene que la doctora deje claro al acordar la atención el total, impuestos aplicables y traslado, y emita el comprobante correspondiente. No se inventaron condiciones económicas nuevas.

## Disponibilidad y mantenimiento

`MAINTENANCE_MODE=true` activa mantenimiento planificado sobre inicio y páginas legales. Requiere despliegue o reinicio según el alojamiento. Las imágenes, PDFs y recursos de Next siguen accesibles para presentar la página. El modo está desactivado por defecto. Se puede revisar `/mantenimiento` sin activarlo.

El proxy produce 503, `Retry-After: 3600`, `Cache-Control: no-store` y `X-Robots-Tag: noindex, nofollow`. El tiempo indica cuándo un cliente puede reintentar, no una promesa de finalización. Las páginas 404/error ofrecen contacto y recuperación. Una caída completa del servidor, DNS o proveedor necesita una respuesta de respaldo en la infraestructura y un monitor externo; este código no puede responder si no se ejecuta.

## Pendientes concretos de publicación

1. Dominio: configurar `NEXT_PUBLIC_SITE_URL`, DNS y HTTPS; reconstruir y comprobar canonical, sitemap, robots y vista previa social. Evitar duplicación entre dominio propio y URL de alojamiento mediante redirección del proveedor.
2. En Vercel se gestiona el certificado del dominio tras validar DNS; comprobar el estado real del alojamiento antes de comprar un certificado separado. [Documentación de SSL](https://vercel.com/docs/domains/working-with-ssl).
3. Probar una visita real desde iPhone/Android: portada → tarifa o plan → WhatsApp. Confirmar apertura del número correcto, volver al navegador, teclado, modo horizontal, letra al 200 % y lector de pantalla. No enviar datos de prueba de otras personas.
4. Reproducir las dos entrevistas y probar las alternativas externas. El origen final y bloqueadores del navegador pueden cambiar su funcionamiento.
5. Verificar en el alojamiento respuestas 404, error, mantenimiento 503 y cabeceras de seguridad. No se probó una caída real del proveedor.
6. Registrar Google Search Console y enviar sitemap. Los metadatos no garantizan indexación ni posición; las FAQ no garantizan resultados enriquecidos.
7. Confirmar el alcance público de la dirección administrativa y conservar autorizaciones/documentación de la actividad. Revisión jurídica local si se busca una validación formal.
8. Repetir auditoría de dependencias al publicar y revisar la cadena de desarrollo pendiente. Activar alertas de dependencias en el repositorio si aún no están habilitadas.
9. Configurar una alerta externa de indisponibilidad y tener un despliegue anterior recuperable. La vía de contacto de WhatsApp debe figurar también en los perfiles públicos.

## Mejoras posteriores con mayor valor

- Medir consultas recibidas y origen de esas consultas antes de añadir más UI. Comenzar con etiquetas de enlaces o registro administrativo, evitando nombres, síntomas y mensajes en analítica.
- Mantener actualizadas tarifas, horario, cobertura y disponibilidad. Mostrar una fecha de revisión cuando el proceso operativo permita mantenerla de verdad.
- Evaluar si el plan Esencial debe aparecer antes en móvil: actualmente el Crónico aparece primero. Es una decisión comercial; se conservó el orden confirmado.
- Para captación local, completar los perfiles públicos del servicio con información coherente y evaluar un perfil de negocio como servicio de área, sin presentar el domicilio administrativo como local de atención.
- No añadir reservas complejas, cuentas o pagos hasta que el volumen de consultas justifique su coste de operación, seguridad y privacidad.

## Validación

Pruebas automatizadas: 17 casos para validación de citas, codificación de WhatsApp, JSON-LD, cabeceras, carga y fallos de entrevistas, HTML inicial, formulario sin JavaScript, enlaces internos, mantenimiento y restricciones del optimizador. También se ejecutó la revisión completa de ESLint y la compilación de producción con TypeScript. El inventario de rendimiento procede de archivos de compilación, sin acceder al navegador bloqueado.
