import babel from "@rolldown/plugin-babel";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";

const config = defineConfig(({ mode }) => {
  const isTest = mode === "test";

  return {
    staged: {
      "*": "vp check --fix",
    },
    fmt: {
      sortImports: {
        groups: [
          "type-import",
          ["value-builtin", "value-external"],
          "type-internal",
          "value-internal",
          ["type-parent", "type-sibling", "type-index"],
          ["value-parent", "value-sibling", "value-index"],
          "unknown",
        ],
      },
      sortPackageJson: {
        sortScripts: true,
      },
      ignorePatterns: ["*.gen.ts"],
    },
    lint: {
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: { "vite-plus/prefer-vite-plus-imports": "error" },
      options: { typeAware: true, typeCheck: true },
    },
    resolve: { tsconfigPaths: true },
    plugins: [
      devtools(),
      ...(!isTest ? [nitro({ rollupConfig: { external: [/^@sentry\//] } })] : []),
      tanstackStart({ prerender: { enabled: true, crawlLinks: true } }),
      viteReact(),
      babel({
        presets: [reactCompilerPreset()],
      }),
    ],
  };
});

export default config;
