import type { Metadata } from "next";
import Link from "next/link";
import { loadHomeCopy, loadProfile } from "@/lib/content";
import { parseMarkdownBlocks } from "@/lib/markdown";
import type { MarkdownBlockType } from "@/lib/types";
import { CommandConsole } from "@/components/home/command-console";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { Reveal } from "@/components/home/reveal";
import { SignalNetwork } from "@/components/home/signal-network";
import { ArrowUpRightIcon, LockIcon, ShieldCheckIcon } from "@/components/icons/animated";

export const metadata: Metadata = {
  title: {
    absolute: "OMT Assist"
  },
  description:
    "OMT Assist is a private operations assistance surface for OMT Global: runbooks, agent context, and machine-readable project data."
};

const operatingLanes = [
  {
    index: "01",
    title: "Runbooks",
    summary: "Procedures written to be executed by people and agents without improvisation."
  },
  {
    index: "02",
    title: "Agent context",
    summary: "Machine-readable surfaces that keep automated work grounded in current facts."
  },
  {
    index: "03",
    title: "Automation",
    summary: "Small, reviewable systems that remove repetitive operational steps."
  },
  {
    index: "04",
    title: "Operational notes",
    summary: "Implementation records kept close to the systems they describe."
  }
];

const publicArtifacts = [
  {
    name: "profile.json",
    summary: "Identity, availability, and the public contact surface.",
    href: "/profile.json"
  },
  {
    name: "projects.json",
    summary: "Curated project records with stack and status metadata.",
    href: "/projects.json"
  },
  {
    name: "resume.json",
    summary: "Structured experience and links for agent consumption.",
    href: "/resume.json"
  },
  {
    name: "sitemap.xml",
    summary: "Canonical routes and machine-readable metadata locations.",
    href: "/sitemap.xml"
  }
];

const stackChips = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GitHub Actions",
  "Cloudflare Pages",
  "Static export"
];

function renderIndexBlocks(blocks: MarkdownBlockType[]) {
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      if (block.level === 1) {
        return null;
      }
      return (
        <h3
          key={`${block.type}-${index}`}
          className="mb-2 font-display text-xl font-semibold tracking-tight text-foreground"
        >
          {block.text}
        </h3>
      );
    }

    if (block.type === "list") {
      return (
        <ul key={`${block.type}-${index}`} className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-primary/80" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`${block.type}-${index}`} className="text-sm leading-7 text-muted-foreground">
        {block.text}
      </p>
    );
  });
}

export default async function HomePage() {
  const [profile, homeCopy] = await Promise.all([loadProfile(), loadHomeCopy()]);
  const indexBlocks = parseMarkdownBlocks(homeCopy);
  const githubSocial = profile.socials.find((social) => social.label === "GitHub");

  return (
    <main aria-label="OMT Assist" className="relative min-h-screen overflow-hidden">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        {/* ---------------------------------------------------------- */}
        {/* Masthead                                                    */}
        {/* ---------------------------------------------------------- */}
        <header className="flex items-center justify-between pt-8 sm:pt-10">
          <div className="flex items-center gap-3">
            <span className="status-dot" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
              OMT&nbsp;Assist
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground sm:flex">
              <LockIcon size={13} aria-hidden />
              Private surface
            </span>
            <a
              href="/omt-global/"
              className="group inline-flex items-center gap-1.5 rounded-sm border border-border/60 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
            >
              OMT Global
              <ArrowUpRightIcon size={13} aria-hidden />
            </a>
          </div>
        </header>

        {/* ---------------------------------------------------------- */}
        {/* Hero                                                        */}
        {/* ---------------------------------------------------------- */}
        <section
          aria-label="Introduction"
          className="relative grid gap-14 pb-24 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-10"
        >
          <div>
            <p className="eyebrow">
              <span>OMT Global // operations assistance</span>
            </p>

            <h1 className="mt-7 font-display text-[clamp(2.9rem,7.5vw,5.8rem)] font-medium leading-[0.98] tracking-tight text-foreground">
              The quiet layer behind
              <br />
              <span className="home-signal-text" data-text="operated systems.">
                operated systems.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              {profile.title}. Runbooks, implementation notes, and agent-readable
              context for OMT Global — kept deliberately small, reviewable, and
              close to the systems they describe.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#artifacts" className="btn-signal">
                Inspect the surface
              </a>
              <a
                href="#index-note"
                className="btn-ghost"
              >
                <ShieldCheckIcon size={15} aria-hidden />
                Access policy
              </a>
            </div>

            <dl className="mt-14 grid max-w-lg gap-6 border-t border-border/40 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  Location
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  Availability
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-foreground">{profile.availability}</dd>
              </div>
            </dl>
          </div>

          <Reveal as="div" delay={180} className="lg:justify-self-end">
            <CommandConsole
              profileName={profile.name}
              githubHandle={githubSocial?.handle ?? "OMT-Global/omt-assist.org"}
            />
          </Reveal>

          <a
            href="#lanes"
            aria-label="Scroll to operating lanes"
            className="scroll-cue absolute -bottom-2 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary lg:block"
          >
            <svg
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="20"
              aria-hidden
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>
        </section>

        <div className="home-horizon-line" aria-hidden />

        {/* ---------------------------------------------------------- */}
        {/* Operating lanes                                             */}
        {/* ---------------------------------------------------------- */}
        <Reveal as="section" id="lanes" aria-label="Operating lanes" className="py-20 sm:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">
                <span>01 — operating lanes</span>
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                A narrow surface, held deliberately.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Everything published here exists to make operational work calmer:
              fewer moving parts, clearer handoffs, no ambient noise.
            </p>
          </div>

          <ol className="space-y-3">
            {operatingLanes.map((lane, laneIndex) => (
              <li key={lane.index}>
                <Reveal delay={laneIndex * 90}>
                  <div className="lane-row grid items-baseline gap-2 rounded-md border border-border/45 bg-card/40 px-5 py-5 sm:grid-cols-[4rem_13rem_1fr] sm:gap-6 sm:px-6">
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-primary/80">
                      {lane.index}
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {lane.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">{lane.summary}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ---------------------------------------------------------- */}
        {/* Signal network + index note                                 */}
        {/* ---------------------------------------------------------- */}
        <section aria-label="Signal network" className="pb-20 sm:pb-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <Reveal>
              <p className="eyebrow">
                <span>02 — signal network</span>
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                One surface, several receivers.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                The same content feeds people and agents from one source of
                truth. Notes live in <code className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[0.85em] text-primary">content/</code>,
                machine-readable artifacts are generated into{" "}
                <code className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[0.85em] text-primary">public/</code>,
                and deployment automation keeps them in lockstep.
              </p>

              <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
                {[
                  "Human pages and JSON payloads are generated from the same markdown and JSON sources.",
                  "GitHub Actions run lint, typecheck, tests, and build on every change.",
                  "Static export lands on Cloudflare Pages behind omt-assist.org."
                ].map((line) => (
                  <li key={line} className="flex gap-3 leading-6">
                    <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-secondary" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <SignalNetwork />
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Machine-readable artifacts                                  */}
        {/* ---------------------------------------------------------- */}
        <Reveal as="section" id="artifacts" aria-label="Machine-readable artifacts" className="pb-20 sm:pb-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">
                <span>03 — artifacts</span>
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Machine-readable by default.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Public payloads are generated on every build, so agents always read
              what the repository actually contains.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {publicArtifacts.map((artifact, artifactIndex) => (
              <Reveal key={artifact.name} delay={artifactIndex * 80} className="h-full">
                <a
                  href={artifact.href}
                  className="endpoint-card group flex h-full flex-col rounded-md p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <code className="font-mono text-sm font-semibold text-primary">
                      {artifact.name}
                    </code>
                    <ArrowUpRightIcon
                      size={15}
                      aria-hidden
                      className="text-muted-foreground transition-colors group-hover:text-primary"
                    />
                  </div>
                  <p className="mt-3 flex-1 text-[13px] leading-6 text-muted-foreground">
                    {artifact.summary}
                  </p>
                  <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
                    GET · application/json
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* ---------------------------------------------------------- */}
        {/* Index note + stack                                          */}
        {/* ---------------------------------------------------------- */}
        <section aria-label="Index note" className="pb-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <Reveal as="div" id="index-note">
              <p className="eyebrow">
                <span>04 — index note</span>
              </p>
              <div className="mt-5 space-y-4">{renderIndexBlocks(indexBlocks)}</div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-md border border-border/45 bg-card/40 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stackChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-sm border border-border/60 bg-background/60 px-3 py-1.5 font-mono text-xs text-foreground"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="mt-8 border-t border-border/40 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    Source
                  </p>
                  {githubSocial ? (
                    <a
                      href={githubSocial.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {githubSocial.handle}
                      <ArrowUpRightIcon size={14} aria-hidden />
                    </a>
                  ) : null}
                  <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                    Deployment automation mirrors the{" "}
                    <code className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[0.85em] text-primary">jmcte.me</code>{" "}
                    pattern: npm scripts, CI gates, static export.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Footer                                                      */}
        {/* ---------------------------------------------------------- */}
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border/40 py-10">
          <p className="text-xs text-muted-foreground">
            © 2026 OMT Assist · Built with Next.js, TypeScript, and Tailwind ·
            Hosted on Cloudflare Pages
          </p>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <span className="status-dot" aria-hidden />
            All systems nominal
          </div>
        </footer>
      </div>
    </main>
  );
}
