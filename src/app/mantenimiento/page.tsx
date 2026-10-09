import type { Metadata } from "next";
import { StatusPage } from "@/components/layout/status-page";

export const metadata: Metadata = {
  title: "Mantenimiento",
  description: "El sitio de LONGEVET se está actualizando. Contacta a la doctora por WhatsApp.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/mantenimiento" },
};

export default function MaintenancePage() {
  return <StatusPage label="Mantenimiento" title="Estamos actualizando el sitio" message="Puedes seguir coordinando tu consulta directamente con la Dra. Junibeth por WhatsApp. Gracias por tu paciencia." />;
}
