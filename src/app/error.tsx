"use client";

import { StatusPage } from "@/components/layout/status-page";

export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <StatusPage label="Problema temporal" title="No pudimos cargar esta página" message="Puedes intentar de nuevo o contactar directamente con la doctora por WhatsApp." retry={retry} />;
}
