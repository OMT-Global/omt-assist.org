import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const displayFont = Geist({
  variable: "--font-display",
  display: "swap"
});

const codeFont = Geist_Mono({
  variable: "--font-code",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "OMT",
    template: "%s | OMT"
  },
  description: "OMT"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${codeFont.variable}`}>
      <body className="min-h-screen bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}
