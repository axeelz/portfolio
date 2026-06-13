import { describe, expect, test } from "vite-plus/test";

import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from "./colors";
import {
  applyThemeToDocument,
  CRITICAL_THEME_CSS,
  getThemeColor,
  resolveThemeState,
  THEME_INIT_SCRIPT,
} from "./dom";
import { THEME_OVERRIDE_VALUE } from "./storage";

describe("theme DOM helpers", () => {
  test("resolveThemeState follows the system theme until an override is stored", () => {
    expect(resolveThemeState(null, false)).toEqual({ isDark: false, isOverriding: false });
    expect(resolveThemeState(null, true)).toEqual({ isDark: true, isOverriding: false });
    expect(resolveThemeState(THEME_OVERRIDE_VALUE, false)).toEqual({
      isDark: true,
      isOverriding: true,
    });
    expect(resolveThemeState(THEME_OVERRIDE_VALUE, true)).toEqual({
      isDark: false,
      isOverriding: true,
    });
  });

  test("applyThemeToDocument toggles the dark class and syncs theme-color meta", () => {
    const calls = {
      classToggle: [] as [string, boolean][],
      selectors: [] as string[],
      attributes: [] as [string, string][],
    };

    const doc = {
      documentElement: {
        classList: {
          toggle: (token: string, force?: boolean) => {
            calls.classToggle.push([token, force ?? false]);
            return force ?? false;
          },
        },
      },
      querySelector: (selector: string) => {
        calls.selectors.push(selector);

        return {
          setAttribute: (name: string, value: string) => {
            calls.attributes.push([name, value]);
          },
        } as HTMLMetaElement;
      },
    } as Pick<Document, "documentElement" | "querySelector">;

    applyThemeToDocument(doc, true);
    applyThemeToDocument(doc, false);

    expect(calls.classToggle).toEqual([
      ["dark", true],
      ["dark", false],
    ]);
    expect(calls.selectors).toEqual(['meta[name="theme-color"]', 'meta[name="theme-color"]']);
    expect(calls.attributes).toEqual([
      ["content", DARK_THEME_COLOR],
      ["content", LIGHT_THEME_COLOR],
    ]);
  });

  test("critical theme CSS paints the html canvas from the shared background variable", () => {
    expect(getThemeColor(false)).toBe(LIGHT_THEME_COLOR);
    expect(getThemeColor(true)).toBe(DARK_THEME_COLOR);
    expect(CRITICAL_THEME_CSS).toContain(
      `:root{--background-color:${LIGHT_THEME_COLOR};color-scheme:light}`,
    );
    expect(CRITICAL_THEME_CSS).toContain(
      `:root.dark{--background-color:${DARK_THEME_COLOR};color-scheme:dark}`,
    );
    expect(CRITICAL_THEME_CSS).toContain("html{background-color:var(--background-color)}");
  });

  test("theme boot script relies on the dark class instead of imperative html paint state", () => {
    expect(THEME_INIT_SCRIPT).toContain("classList.toggle('dark',dark)");
    expect(THEME_INIT_SCRIPT).toContain("setAttribute('content'");
    expect(THEME_INIT_SCRIPT).not.toContain("backgroundColor");
    expect(THEME_INIT_SCRIPT).not.toContain("colorScheme");
  });
});
