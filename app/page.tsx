import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "OMT"
  },
  description: "OMT placeholder site."
};

export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <h1 className="text-center text-6xl font-semibold tracking-normal text-foreground sm:text-7xl">
        OMT
      </h1>
    </main>
  );
}
