import { existsSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";

import { portfolioData } from "./portfolio";

test("every project image exists in public/img", () => {
  for (const project of portfolioData.projects) {
    expect(existsSync(join(process.cwd(), "public/img", project.image)), project.image).toBe(true);
  }
});
