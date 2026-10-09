# LONGEVET · Servicios Veterinarios (Especialidad en Geriatría)

Sitio de atención veterinaria a domicilio de la Dra. Junibeth González Ramírez. Las citas se coordinan por WhatsApp; el sitio no confirma reservas ni procesa pagos.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4 + Radix UI + shadcn/ui
- **Arquitectura**: sin base de datos de reservas. Formulario local y enlaces de WhatsApp. Las entrevistas conectan con YouTube y Dailymotion.
- **Animaciones**: CSS y observación del viewport, con contenido visible antes de hidratar y respeto de movimiento reducido.
- **Iconografía**: Lucide React
- **Validaciones**: tipos, límites, opciones, fechas y horarios en `src/lib/booking.ts`.

## 🚀 Despliegue en Vercel (1 Clic)

1. Conecta tu cuenta de Vercel con el repositorio: `https://github.com/owllain/longivet`.
2. Haz clic en **Deploy**.
3. Configura `NEXT_PUBLIC_SITE_URL` con el dominio definitivo y despliega. No hacen falta credenciales de base de datos. Revisa DNS, HTTPS, sitemap y las entrevistas en el dominio público.

## 📱 Flujo de Citas (WhatsApp-First)

1. El tutor puede escribir directamente por WhatsApp o desplegar la ayuda opcional para preparar su mensaje.
2. El formulario solicita nombre, mascota y zona; el servicio, horario y comentarios son opcionales.
3. Tras validar los datos y la autorización, se abre WhatsApp con el texto preparado. El tutor debe enviarlo allí.
4. La doctora confirma cobertura, presupuesto y cita directamente. Los cambios se coordinan también por WhatsApp.
5. El formulario no crea códigos, cuentas ni reservas y no guarda los datos en el sitio. Sin JavaScript, sus campos permanecen deshabilitados para evitar un envío nativo al alojamiento.

## 💻 Desarrollo Local

1. Instala las dependencias:
   ```bash
   npm ci
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Verificación y publicación

- `npm test`: formulario, escape de contenido, videos, HTML inicial y mantenimiento.
- `npm run lint`: revisión de todo el proyecto.
- `npm run build`: compilación de producción y comprobación de tipos.
- `npm audit --omit=dev`: avisos en dependencias de producción. La auditoría completa incluye también herramientas de desarrollo.
- `node scripts/audit-bundle.mjs`: inventario del HTML y scripts después de compilar; no sustituye Lighthouse ni pruebas reales de móvil.

Consulta `docs/auditoria-final.md` para el alcance, resultados y pendientes de la revisión.

## Error y mantenimiento

- `/mantenimiento` permite revisar la página preparada, sin activar el modo de mantenimiento.
- Para mantenimiento planificado, establece `MAINTENANCE_MODE=true` y despliega o reinicia el servidor. Las páginas principales responderán con 503, sin caché y con `Retry-After`. Desactiva la variable para volver a la atención normal del sitio.
- También hay páginas de error de aplicación, error del layout y enlaces inexistentes. Mantienen una vía de contacto con la doctora.
- Una caída completa del alojamiento requiere una respuesta o página de respaldo del proveedor: la aplicación no puede ejecutarse si el proveedor está indisponible.
