"use client";

import { cn } from "@/lib/utils";
import { useTilt } from "./use-tilt";
import { useTypewriter } from "./use-typewriter";

type CommandConsoleProps = {
  profileName: string;
  githubHandle: string;
  className?: string;
};

const ARTIFACT_LINES = [
  "▸ profile.json",
  "▸ projects.json",
  "▸ resume.json",
  "▸ sitemap.xml"
].join("\n");

/**
 * A living terminal panel: tilts toward the pointer while an artifact
 * listing types itself out and loops.
 */
export function CommandConsole({ profileName, githubHandle, className }: CommandConsoleProps) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>();
  const typedArtifacts = useTypewriter(ARTIFACT_LINES, {
    typeMs: 34,
    holdMs: 2400,
    startMs: 900
  });

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "tilt-card command-shell relative w-full max-w-md rounded-lg p-1.5",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        aria-hidden
      />

      <div className="tilt-layer rounded-md border border-border/40 bg-background/50 px-5 py-5 sm:px-6">
        <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-destructive/70" />
            <span className="h-2 w-2 rounded-full bg-accent/80" />
            <span className="h-2 w-2 rounded-full bg-primary/80" />
          </div>
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {profileName.toLowerCase().replace(/\s+/g, "-")} · session
          </p>
        </div>

        <div className="mt-4 space-y-1.5 font-mono text-[13px] leading-6">
          <p>
            <span className="text-primary">$</span>{" "}
            <span className="text-foreground">assist status --public</span>
          </p>
          <p className="text-muted-foreground">
            <span className="text-foreground/70">surface</span>
            <span className="mx-2 text-border">·</span>
            private / operational
          </p>
          <p className="truncate text-muted-foreground">
            <span className="text-foreground/70">source</span>
            <span className="mx-2 text-border">·</span>
            {githubHandle}
          </p>
          <p className="text-muted-foreground">
            <span className="text-foreground/70">build</span>
            <span className="mx-2 text-border">·</span>
            <span className="text-primary">static export ✓</span>
          </p>

          <p className="pt-2">
            <span className="text-primary">$</span>{" "}
            <span className="text-foreground">assist artifacts --list</span>
          </p>
          <pre className="min-h-[6.5rem] whitespace-pre-line font-mono text-[13px] leading-6 text-secondary">
            <span>{typedArtifacts}</span>
            <span className="command-caret" aria-hidden />
          </pre>
        </div>
      </div>
    </div>
  );
}
