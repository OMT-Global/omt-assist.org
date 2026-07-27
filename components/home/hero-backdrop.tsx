"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Ambient backdrop for the homepage: layered grid field, drifting signal
 * glows, a ghost wire ring, and an outlined ghost word that parallaxes
 * against the page scroll. All layers are decorative and inert.
 */
export function HeroBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const ringY = useTransform(scrollY, [0, 900], [0, -140]);
  const ghostY = useTransform(scrollY, [0, 900], [0, 190]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Base wash: warm dark ink with a faint paper tint low-left */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_-10%,hsl(150_14%_10%)_0%,hsl(160_14%_5%)_52%,hsl(165_15%_3.5%)_100%)]" />

      {/* Structural grid field, masked toward the hero */}
      <div className="home-grid-field absolute inset-0" />

      {/* Horizon glow band behind the hero */}
      <div className="home-horizon absolute inset-x-0 top-[8%] h-[46rem]" />

      {/* Drifting signal glows */}
      <div className="home-drift-glow home-drift-glow--green absolute -top-40 left-[8%] h-[34rem] w-[34rem]" />
      <div className="home-drift-glow home-drift-glow--amber absolute right-[-8%] top-[30%] h-[30rem] w-[30rem]" />

      {/* Ghost wire ring, slow parallax rise */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: ringY }}
        className="home-ghost-ring absolute right-[-16rem] top-[-14rem] hidden h-[44rem] w-[44rem] lg:block"
      />

      {/* Outlined ghost word, counter-parallax drift */}
      <motion.span
        style={prefersReducedMotion ? undefined : { y: ghostY }}
        className="home-ghost-word absolute left-[-2rem] top-[34rem] hidden select-none text-[clamp(9rem,22vw,19rem)] lg:block"
      >
        assist
      </motion.span>

      {/* Film grain */}
      <div className="home-grain absolute inset-0" />

      {/* Bottom fade into the pure background for the footer */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(0deg,hsl(165_15%_3.5%),transparent)]" />
    </div>
  );
}
