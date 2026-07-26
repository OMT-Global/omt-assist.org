import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        ink: "hsl(var(--ink))",
        paper: "hsl(var(--paper))"
      },
      borderRadius: {
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 10px)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Cambria", "serif"],
        mono: ["var(--font-code)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-code)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        subtlePulse: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 hsl(var(--primary) / 0.22)" },
          "50%": { transform: "scale(1.02)", boxShadow: "0 0 0 10px hsl(var(--primary) / 0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "drift-a": {
          from: { transform: "translate3d(-4%, -2%, 0) scale(1)" },
          to: { transform: "translate3d(5%, 6%, 0) scale(1.15)" }
        },
        "drift-b": {
          from: { transform: "translate3d(3%, 5%, 0) scale(1.1)" },
          to: { transform: "translate3d(-5%, -3%, 0) scale(0.95)" }
        },
        "caret-blink": {
          "0%, 55%": { opacity: "1" },
          "56%, 100%": { opacity: "0" }
        },
        "ring-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        "ping-dot": {
          "0%": { transform: "scale(0.6)", opacity: "0.85" },
          "80%, 100%": { transform: "scale(2.2)", opacity: "0" }
        },
        "cue-drop": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.9" },
          "55%": { transform: "translateY(7px)", opacity: "0.35" }
        }
      },
      animation: {
        "fade-in": "fadeIn 0.55s ease-out both",
        "subtle-pulse": "subtlePulse 4s ease-in-out infinite",
        "icon-float": "float 5s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
