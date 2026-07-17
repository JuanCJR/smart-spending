import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { makeQueryClient } from "./query-client";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={makeQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

function Balance() {
  const query = useQuery({
    queryKey: ["balance"],
    queryFn: async () => 42,
  });
  if (query.isLoading) return <p>Cargando</p>;
  return <p>Saldo: {query.data}</p>;
}

describe("React Query wiring", () => {
  it("resolves a useQuery inside the QueryClientProvider wrapper", async () => {
    render(<Balance />, { wrapper });
    expect(await screen.findByText("Saldo: 42")).toBeInTheDocument();
  });
});
