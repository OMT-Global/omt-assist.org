"use client";

import { useEffect, useState } from "react";

type TypewriterOptions = {
  typeMs?: number;
  holdMs?: number;
  startMs?: number;
};

/**
 * Types a string one character at a time, holds, then loops. Reduced-motion
 * users receive the full string immediately.
 */
export function useTypewriter(
  text: string,
  { typeMs = 42, holdMs = 1900, startMs = 700 }: TypewriterOptions = {}
): string {
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let position = 0;
    let typeTimer = 0;
    let holdTimer = 0;

    const tick = () => {
      position += 1;
      setCount(Math.min(position, text.length));

      if (position < text.length) {
        typeTimer = window.setTimeout(tick, typeMs);
        return;
      }

      holdTimer = window.setTimeout(() => {
        position = 0;
        setCount(0);
        typeTimer = window.setTimeout(tick, typeMs);
      }, holdMs);
    };

    typeTimer = window.setTimeout(tick, startMs);

    return () => {
      window.clearTimeout(typeTimer);
      window.clearTimeout(holdTimer);
    };
  }, [text, typeMs, holdMs, startMs, reducedMotion]);

  return reducedMotion ? text : text.slice(0, count);
}
