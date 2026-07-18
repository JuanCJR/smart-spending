import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const cssPath = resolve(process.cwd(), "app/app.css");
const css = readFileSync(cssPath, "utf8");

describe("design tokens (app.css)", () => {
  it("defines the paper-ledger semantic surface + accent tokens", () => {
    expect(css).toContain("--surface-card:");
    expect(css).toContain("--accent:");
  });

  it("defines income/expense semantic tokens", () => {
    expect(css).toContain("--income:");
    expect(css).toContain("--expense:");
  });

  it("defines the display + body font families", () => {
    expect(css).toContain("--font-display:");
    expect(css).toContain("--font-body:");
  });

  it("reassigns semantic tokens in dark mode via data-theme attribute", () => {
    expect(css).toContain('[data-theme="dark"]');
  });

  it("wires html/body to the semantic page surface token", () => {
    expect(css).toContain("var(--surface-page)");
  });
});
