import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./home";

describe("<Home /> landing", () => {
  it("renders the hero H1 with the headline copy", () => {
    render(<Home />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Anota cada peso/i);
    expect(h1).toHaveTextContent(/sabrás a dónde va/i);
  });

  it("renders the four feature titles", () => {
    render(<Home />);
    for (const title of ["Registro", "Resumen", "Recurrentes", "Historial"]) {
      expect(
        screen.getByRole("heading", { name: title }),
      ).toBeInTheDocument();
    }
  });

  it("renders the primary hero CTA", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /Abrir mi libro/i }),
    ).toBeInTheDocument();
  });

  it("renders the demo ledger card header for the month", () => {
    render(<Home />);
    expect(screen.getByText("Junio 2026")).toBeInTheDocument();
  });
});
