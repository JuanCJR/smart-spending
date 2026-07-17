import { describe, expect, it } from "vitest";
import { createStore } from "zustand/vanilla";

interface CounterState {
  count: number;
  increment: () => void;
}

describe("zustand", () => {
  it("creates a store and updates state through actions", () => {
    const store = createStore<CounterState>((set) => ({
      count: 0,
      increment: () => set((s) => ({ count: s.count + 1 })),
    }));

    expect(store.getState().count).toBe(0);
    store.getState().increment();
    expect(store.getState().count).toBe(1);
  });
});
