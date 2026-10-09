import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next();
  return NextResponse.rewrite(new URL("/mantenimiento", request.url), {
    status: 503,
    headers: {
      "Retry-After": "3600",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

// Las imágenes, archivos de Next y PDFs siguen disponibles durante el mantenimiento.
export const config = { matcher: ["/", "/privacidad", "/terminos"] };
