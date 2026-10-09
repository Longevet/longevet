"use client";
import { useState } from "react";
import { Play } from "lucide-react";
export function InterviewVideo() {
  const [started, setStarted] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  return <div className="relative aspect-video min-h-44 overflow-hidden rounded-2xl border bg-brand-navy sm:min-h-0">
    {started ? <iframe src="https://www.dailymotion.com/embed/video/x9u4q44?mute=false&autoplay=1" title="Entrevista a la Dra. Junibeth en Su Lado Positivo, Canal 13" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full border-0" /> :
      <button type="button" onClick={() => setStarted(true)} aria-label="Reproducir entrevista de la Dra. Junibeth en Canal 13" className="group relative flex h-full w-full items-center justify-center text-white focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-gold">
        {!thumbnailFailed && <img src="https://www.dailymotion.com/thumbnail/video/x9u4q44" alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setThumbnailFailed(true)} className="absolute inset-0 h-full w-full object-cover" />}
        <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/40" />
        <span className="relative flex flex-col items-center gap-3"><span className="flex size-16 items-center justify-center rounded-full bg-white text-brand-navy shadow-xl"><Play className="ml-1 size-7 fill-current" aria-hidden /></span><span className="rounded-full bg-black/65 px-4 py-2 text-sm font-bold">Reproducir entrevista</span></span>
      </button>}
  </div>;
}

export function YoutubeVideo({ videoId, title }: { videoId: string, title: string }) {
  const [started, setStarted] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  return <div className="relative aspect-video min-h-44 overflow-hidden rounded-2xl border bg-brand-navy sm:min-h-0">
    {started ? <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full border-0" /> :
      <button type="button" onClick={() => setStarted(true)} aria-label={`Reproducir ${title}`} className="group relative flex h-full w-full items-center justify-center text-white focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-gold">
        {!thumbnailFailed && <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setThumbnailFailed(true)} className="absolute inset-0 h-full w-full object-cover" />}
        {thumbnailFailed && <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-deep to-brand-teal-dark" />}
        <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/40" />
        <span className="relative flex flex-col items-center gap-3 px-5">{thumbnailFailed && <span className="max-w-sm text-center text-lg font-bold">{title}</span>}<span className="flex size-16 items-center justify-center rounded-full bg-white text-brand-navy shadow-xl"><Play className="ml-1 size-7 fill-current" aria-hidden /></span><span className="rounded-full bg-black/65 px-4 py-2 text-sm font-bold">Reproducir entrevista</span></span>
      </button>}
  </div>;
}
