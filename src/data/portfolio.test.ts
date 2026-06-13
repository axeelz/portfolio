import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vite-plus/test";

import { getTechnology, portfolioData } from "./portfolio";

describe("projects.json integrity", () => {
  test("every project image exists in public/img", () => {
    for (const project of portfolioData.projects) {
      expect(existsSync(join(process.cwd(), "public/img", project.image)), project.image).toBe(
        true,
      );
    }
  });

  test("every project tech resolves to a known technology", () => {
    for (const project of portfolioData.projects) {
      for (const tech of project.techs) {
        expect(getTechnology(tech), `${project.name}: ${tech}`).toBeDefined();
      }
    }
  });

  test("getTechnology matches by id and by case-insensitive label", () => {
    const [technology] = portfolioData.technologies;
    expect(getTechnology(technology.id)).toBe(technology);
    expect(getTechnology(technology.label.toUpperCase())).toBe(technology);
  });
});
