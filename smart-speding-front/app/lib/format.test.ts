import { describe, expect, it } from "vitest";
import { formatCLP } from "./format";

describe("formatCLP", () => {
  it("formats zero as $0", () => {
    expect(formatCLP(0)).toBe("$0");
  });

  it("adds a thousands separator", () => {
    expect(formatCLP(1234)).toBe("$1.234");
  });

  it("formats millions with dot separators", () => {
    expect(formatCLP(1234567)).toBe("$1.234.567");
  });

  it("formats negative amounts with the sign before the symbol", () => {
    expect(formatCLP(-1234)).toBe("-$1.234");
  });

  it("rounds non-integer amounts to the nearest integer", () => {
    expect(formatCLP(1234.4)).toBe("$1.234");
    expect(formatCLP(1234.6)).toBe("$1.235");
  });

  it("rounds negative non-integers correctly", () => {
    expect(formatCLP(-1234.6)).toBe("-$1.235");
  });
});
