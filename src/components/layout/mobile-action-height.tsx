"use client";

import { useEffect } from "react";

/** Reserva la altura real de las acciones, incluso al ampliar el texto. */
export function MobileActionHeight() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-mobile-actions]");
    if (!bar || !window.ResizeObserver) return;
    const update = () => {
      const height = Math.ceil(bar.getBoundingClientRect().height);
      // Al enfocar un campo la barra se oculta; conserva el espacio para evitar saltos.
      if (height > 0) document.documentElement.style.setProperty("--mobile-actions-height", `${height}px`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    update();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--mobile-actions-height");
    };
  }, []);
  return null;
}
