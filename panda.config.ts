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
        scaleInSubtle: {
          from: {
            transform: "scale(0.8)",
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
            transform: "scale(0.8)",
            opacity: 0,
          },
        },
      },
    },
  },
});
