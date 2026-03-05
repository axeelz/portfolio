import { defaultPatterns } from "web-haptics";

export const HAPTICS = Object.fromEntries(Object.keys(defaultPatterns).map((k) => [k, k])) as {
  [K in keyof typeof defaultPatterns]: K;
};
