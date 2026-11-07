import { expect, test } from "vite-plus/test";

import { skyMoment, sunElevation } from "./sun";

test("follows the sun above Paris across the year and the day", () => {
  expect(sunElevation(new Date("2026-06-21T11:50:00Z"))).toBeCloseTo(64.6, 0);
  expect(sunElevation(new Date("2026-12-21T11:50:00Z"))).toBeCloseTo(17.7, 0);
  expect(sunElevation(new Date("2026-12-21T23:50:00Z"))).toBeLessThan(-18);
});

test("tells dawn from dusk around sunrise and sunset", () => {
  expect(skyMoment(new Date("2026-11-07T07:00:00Z"))).toBe("dawn");
  expect(skyMoment(new Date("2026-11-07T12:00:00Z"))).toBe("day");
  expect(skyMoment(new Date("2026-11-07T16:45:00Z"))).toBe("dusk");
  expect(skyMoment(new Date("2026-11-07T22:00:00Z"))).toBe("night");
});
