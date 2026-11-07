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
        rise: {
          from: { opacity: 0, transform: "translateY(22px)" },
        },
        nameUp: {
          from: { opacity: 0, transform: "translateY(14%)" },
        },
        fadeIn: {
          from: { opacity: 0 },
        },
        recede: {
          to: { opacity: 0.12, transform: "scale(0.9)" },
        },
        breathe: {
          "50%": { opacity: 0.3 },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        coverIn: {
          from: { opacity: 0.2, transform: "scale(0.96)" },
        },
        roll: {
          from: { transform: "translateY(0)" },
        },
      },
    },
  },
});
