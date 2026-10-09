import Image from "next/image";
import { HeartHandshake, GraduationCap } from "lucide-react";
import { InterviewVideo, YoutubeVideo } from "@/components/sections/interview-video";
import { site } from "@/lib/site";
export function Team() {
  return <section id="equipo" aria-labelledby="titulo-equipo" className="py-12 sm:py-16"><div className="mx-auto max-w-6xl px-4 sm:px-6">
    <div className="grid items-center gap-8 rounded-[2rem] border bg-card p-5 sm:p-10 lg:grid-cols-2">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl"><Image src="/images/asset (1).png" alt="Dra. Junibeth González Ramírez con uno de sus pacientes" fill sizes="(max-width: 1024px) 90vw, 448px" className="object-cover object-top" /></div>
      <div><p className="inline-flex items-center gap-2 rounded-full bg-brand-teal-soft dark:bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"><HeartHandshake className="size-5" aria-hidden />Médica de cabecera</p><h2 id="titulo-equipo" className="mt-5 text-3xl font-extrabold sm:text-4xl">Dra. Junibeth González Ramírez</h2><p className="mt-3 font-semibold text-brand-teal-dark dark:text-brand-teal">Médica veterinaria con énfasis en geriatría</p><p className="mt-5 leading-relaxed text-muted-foreground">Un vínculo cercano para acompañar cada etapa. Atención clínica, manejo del dolor y seguimiento personalizado para perros y gatos mayores, en la comodidad de su hogar.</p><p className="mt-4 leading-relaxed text-muted-foreground">La doctora conoce a tu mascota, escucha lo que observas en casa y coordina contigo un plan de cuidado adaptado a sus necesidades.</p><p className="mt-5 flex items-start gap-2 text-sm"><GraduationCap className="size-5 shrink-0 text-brand-teal" aria-hidden />Diplomado en Geriatría para animales domésticos</p><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-brand-teal-dark px-6 font-bold text-white">Agendar cita con la doctora</a></div>
    </div>
    <div className="mt-16 space-y-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.6fr]">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-bold text-brand-teal-dark dark:text-brand-teal">Llegó la Hora · Extra Tv</p>
          <h3 className="mt-3 text-2xl font-bold">Programa del 20 de noviembre, 2025</h3>
          <p className="mt-3 text-muted-foreground">La Dra. Junibeth conversa sobre cuidados integrales, bienestar animal y la importancia de la prevención en esta entrevista.</p>
          <a href="https://youtu.be/zs8bupVZSKQ" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline text-brand-navy hover:text-brand-teal dark:text-brand-teal-soft dark:hover:text-brand-teal">Ver la entrevista en YouTube</a>
        </div>
        <div className="order-1 lg:order-2">
          <YoutubeVideo videoId="zs8bupVZSKQ" title="Entrevista en Llegó la Hora, Extra Tv" />
        </div>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.6fr]">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-bold text-brand-teal-dark dark:text-brand-teal">Su Lado Positivo · Canal 13</p>
          <h3 className="mt-3 text-2xl font-bold">Conversemos sobre la edad dorada</h3>
          <p className="mt-3 text-muted-foreground">La Dra. Junibeth comparte su enfoque sobre medicina geriátrica veterinaria en esta entrevista.</p>
          <div className="mt-4 flex flex-col items-start gap-2">
            <a href="https://sinartdigital.com/suladopositivo/programas/item/su-lado-positivo-12-noviembre-2025" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold underline text-brand-navy hover:text-brand-teal dark:text-brand-teal-soft dark:hover:text-brand-teal">Ver en Sinart Digital (Referencia Principal)</a>
            <a href="https://www.dailymotion.com/video/x9u4q44" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium underline text-muted-foreground hover:text-foreground">Opción adicional en Dailymotion</a>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <InterviewVideo />
        </div>
      </div>
    </div>
  </div></section>;
}
