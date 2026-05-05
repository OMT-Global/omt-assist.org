import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "OMT Assist"
  },
  description: "OMT Assist."
};

export default function HomePage() {
  return (
    <main
      aria-label="OMT Assist"
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/omt-assist/ig_0cea3c1c0cf26aec0169f51036527c819b9e500524417054fb.png')"
      }}
    >
      <span className="sr-only">OMT Assist</span>
    </main>
  );
}
