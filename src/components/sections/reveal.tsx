"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Aparición suave al entrar en viewport, respetando prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const element = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const target = element.current;
    if (!target || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        target.dataset.revealed = "true";
        observer.disconnect();
      }
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={node => { element.current = node; }}
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
