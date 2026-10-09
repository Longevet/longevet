"use client";

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  // Independiente del layout, de sus estilos y de sus fuentes.
  const action = { display: "inline-flex", alignItems: "center", minHeight: 48, padding: "12px 20px", borderRadius: 24, font: "inherit", fontWeight: 700 };
  return <html lang="es"><head><title>Problema temporal | LONGEVET</title><meta name="robots" content="noindex" /></head><body style={{ margin: 0, background: "#fbf9f5", color: "#2e3d4d", fontFamily: "Arial, sans-serif" }}>
    <main id="contenido" style={{ maxWidth: 640, margin: "0 auto", padding: "64px 24px", overflowWrap: "anywhere" }}>
      <p style={{ color: "#1f7a70", fontWeight: 700 }}>LONGEVET</p>
      <h1>No pudimos cargar el sitio</h1><p style={{ lineHeight: 1.6 }}>Intenta nuevamente. También puedes contactar a la Dra. Junibeth por WhatsApp para coordinar tu visita.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <button onClick={retry} style={{ ...action, border: "1px solid #858e95", background: "#fff", color: "#2e3d4d", cursor: "pointer" }}>Intentar de nuevo</button>
        <a href="https://wa.me/50671399239" target="_blank" rel="noopener noreferrer" style={{ ...action, background: "#1f7a70", color: "#fff", textDecoration: "none" }}>Contactar por WhatsApp</a>
      </div><p>+506 7139 9239 · Atención a domicilio con cita</p>
    </main>
  </body></html>;
}
