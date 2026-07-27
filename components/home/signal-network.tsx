"use client";

import type { CSSProperties } from "react";
import { ShieldCheckIcon } from "@/components/icons/animated";

type OrbitNode = {
  label: string;
  caption: string;
  tone: "signal" | "amber" | "ivory";
  radiusClass: string;
  spinDuration: string;
  spinDelay: string;
  pingDelay: string;
};

const ORBIT_NODES: OrbitNode[] = [
  {
    label: "Human operators",
    caption: "runbooks + notes",
    tone: "signal",
    radiusClass: "top-[5%]",
    spinDuration: "84s",
    spinDelay: "0s",
    pingDelay: "0s"
  },
  {
    label: "Agents",
    caption: "JSON context",
    tone: "amber",
    radiusClass: "top-[5%]",
    spinDuration: "84s",
    spinDelay: "-42s",
    pingDelay: "0.7s"
  },
  {
    label: "Generated artifacts",
    caption: "public payloads",
    tone: "ivory",
    radiusClass: "top-[23%]",
    spinDuration: "126s",
    spinDelay: "-31s",
    pingDelay: "1.4s"
  },
  {
    label: "Source repository",
    caption: "OMT-Global",
    tone: "signal",
    radiusClass: "top-[23%]",
    spinDuration: "126s",
    spinDelay: "-94s",
    pingDelay: "2.1s"
  }
];

const TONE_CLASS: Record<OrbitNode["tone"], string> = {
  signal: "bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.7)]",
  amber: "bg-accent shadow-[0_0_14px_hsl(var(--accent)/0.6)]",
  ivory: "bg-paper shadow-[0_0_14px_hsl(var(--paper)/0.5)]"
};

/**
 * A slow constellation diagram: receivers orbit the OMT Assist surface while
 * dashed scan rings sweep. Pure CSS animation, decorative by default, with
 * labels exposed on hover/focus and summarized in the legend below.
 */
export function SignalNetwork() {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative aspect-square w-full">
        {/* Corner framing ticks */}
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-border/50" aria-hidden />
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-border/50" aria-hidden />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-border/50" aria-hidden />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-border/50" aria-hidden />

        {/* Concentric rings */}
        <div className="orbit-ring absolute inset-[6%]" aria-hidden />
        <div className="orbit-ring orbit-ring--dashed absolute inset-[24%]" aria-hidden />
        <div className="orbit-ring orbit-ring--dashed-reverse absolute inset-[42%]" aria-hidden />

        {/* Crosshair */}
        <div className="absolute left-1/2 top-[6%] h-[88%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border/40 to-transparent" aria-hidden />
        <div className="absolute left-[6%] top-1/2 h-px w-[88%] -translate-y-1/2 bg-gradient-to-r from-transparent via-border/40 to-transparent" aria-hidden />

        {/* Orbiting receivers */}
        {ORBIT_NODES.map((node) => (
          <div
            key={node.label}
            className="orbit-spin absolute inset-0"
            style={
              {
                "--spin-duration": node.spinDuration,
                "--spin-delay": node.spinDelay
              } as CSSProperties
            }
          >
            <button
              type="button"
              className={`orbit-node group absolute left-1/2 ${node.radiusClass} -translate-x-1/2 cursor-default focus:outline-none`}
              aria-label={`Signal receiver: ${node.label}`}
            >
              <span className="orbit-spin-counter relative block h-3.5 w-3.5" style={{ "--spin-duration": node.spinDuration, "--spin-delay": node.spinDelay } as CSSProperties}>
                <span className="orbit-ping" style={{ "--ping-delay": node.pingDelay } as CSSProperties} aria-hidden />
                <span className={`relative block h-3.5 w-3.5 rounded-full ${TONE_CLASS[node.tone]}`} aria-hidden />
              </span>
              <span className="orbit-node-label absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 text-center">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                  {node.label}
                </span>
                <span className="block text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  {node.caption}
                </span>
              </span>
            </button>
          </div>
        ))}

        {/* Center: the surface itself */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 rotate-45 rounded-xl border border-primary/40 bg-primary/10 shadow-[0_0_36px_hsl(var(--primary)/0.25)]" aria-hidden />
            <span className="absolute inset-0 rotate-45 animate-subtle-pulse rounded-xl border border-primary/25" aria-hidden />
            <ShieldCheckIcon size={26} className="relative text-primary" aria-hidden />
          </div>
          <p className="mt-3 w-max text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            OMT Assist
          </p>
        </div>
      </div>

      {/* Legend (persistent labels for the orbiting receivers) */}
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {ORBIT_NODES.map((node) => (
          <li key={node.label} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${TONE_CLASS[node.tone]}`} aria-hidden />
            {node.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
