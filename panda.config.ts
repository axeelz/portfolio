import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  jsxFramework: "react",
  utilities: {
    extend: {
      // shortcut: Panda 2.2 omits cornerShape from generated types; remove when codegen supports it.
      cornerShape: {
        values: ["squircle"],
        transform: (value) => ({ cornerShape: value }),
      },
    },
  },
  conditions: {
    extend: {
      canHover: "@media (hover: hover) and (pointer: fine)",
    },
  },
  theme: {
    extend: {
      breakpoints: {
        sm: "30rem",
        lg: "51.875rem",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: {
            opacity: 0.1,
            transform: "translateY(-1rem)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        pileNudge: {
          "0%, 100%": { translate: "0 0", rotate: "0deg" },
          "40%": { translate: "52px -4px", rotate: "5deg" },
        },
        nameShine: {
          from: { backgroundPosition: "100% 0" },
          to: { backgroundPosition: "0% 0" },
        },
        contactSpotlight: {
          "0%": { transform: "scale(0.96)", boxShadow: "0 0 0 10px transparent" },
          "22%": { transform: "scale(1.045)", boxShadow: "0 0 0 2px var(--text-color)" },
          "70%": { transform: "scale(1)", boxShadow: "0 0 0 2px var(--text-color)" },
          "100%": { transform: "scale(1)", boxShadow: "0 0 0 2px transparent" },
        },
        scaleInSubtle: {
          from: {
            transform: "scale(0.95)",
            opacity: 0,
          },
          to: {
            transform: "scale(1)",
            opacity: 1,
          },
        },
        scaleOutSubtle: {
          from: {
            transform: "scale(1)",
            opacity: 1,
          },
          to: {
            transform: "scale(0.95)",
            opacity: 0,
          },
        },
      },
    },
  },
});
