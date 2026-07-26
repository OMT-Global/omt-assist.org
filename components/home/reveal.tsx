"use client";

import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState
} from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>;

/**
 * Fades and lifts content into place the first time it enters the viewport.
 * The transition itself lives in globals.css (`.reveal`) so reduced-motion
 * users get an instant, motion-free reveal.
 */
export function Reveal({ as, delay = 0, className, children, ...props }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const elementProps = {
    ...(props as object),
    ref,
    "data-reveal": revealed ? "on" : "off",
    style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
    className: cn("reveal", className)
  } as ComponentPropsWithoutRef<"div">;

  return <Tag {...elementProps}>{children}</Tag>;
}
