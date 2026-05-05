import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "OMT Global"
  },
  description:
    "OMT Global builds practical software systems for home automation, DevOps tooling, and agent-assisted operations."
};

export default function OMTGlobalPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">
      <section
        aria-label="OMT Global"
        className="landing-hero relative flex min-h-screen items-end overflow-hidden bg-cover bg-center px-6 py-10 sm:px-10 lg:px-16"
        style={{
          backgroundImage: "url('/omt-assist/omt-global-landing-hero.png')"
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,7,0.92)_0%,rgba(5,8,7,0.72)_38%,rgba(5,8,7,0.24)_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(0deg,rgba(5,8,7,0.98),rgba(5,8,7,0))]" />

        <div className="relative z-10 mb-4 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#6dff42]">
            OMT Global
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Practical software for operated systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
            OMT Global builds focused software projects across home automation,
            DevOps tooling, systems programming, and agent-assisted operations.
          </p>
        </div>
      </section>
    </main>
  );
}
