import { site } from "@/lib/site";

export function StatusPage({ title, message, label, retry }: {
  title: string;
  message: string;
  label: string;
  retry?: () => void;
}) {
  return (
    <main id="contenido" tabIndex={-1} className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-5 py-12">
      <p className="text-sm font-bold tracking-wider text-brand-teal-dark dark:text-brand-teal">LONGEVET · {label}</p>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{message}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        {retry && <button type="button" onClick={retry} className="min-h-12 rounded-full border px-5 font-bold">Intentar de nuevo</button>}
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-brand-teal-dark px-5 py-3 font-bold text-white">Contactar por WhatsApp</a>
        <a href="/" className="inline-flex min-h-12 items-center px-3 font-semibold underline">Volver al inicio</a>
      </div>
      <p className="mt-7 text-sm text-muted-foreground">Atención a domicilio con cita · {site.phone}</p>
    </main>
  );
}
