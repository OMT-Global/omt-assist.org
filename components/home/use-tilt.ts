"use client";

import { type MouseEvent, useCallback, useRef } from "react";

const MAX_TILT_DEGREES = 6;

/**
 * Gentle pointer-tracking tilt for console/panel surfaces. Pointer-follow is
 * batched through requestAnimationFrame and skipped entirely for
 * reduced-motion users.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const frame = useRef(0);

  const onMouseMove = useCallback((event: MouseEvent<T>) => {
    const node = ref.current;
    if (!node) {
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const ratioX = (event.clientX - rect.left) / rect.width - 0.5;
    const ratioY = (event.clientY - rect.top) / rect.height - 0.5;

    window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      node.style.transform = `perspective(900px) rotateX(${(-ratioY * MAX_TILT_DEGREES).toFixed(
        2
      )}deg) rotateY(${(ratioX * MAX_TILT_DEGREES).toFixed(2)}deg)`;
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    window.cancelAnimationFrame(frame.current);
    node.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
