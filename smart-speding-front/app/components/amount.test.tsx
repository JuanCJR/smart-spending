import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Amount } from "./amount";

describe("<Amount />", () => {
  it("renders the value formatted as CLP", () => {
    render(<Amount value={1234} />);
    expect(screen.getByText("$1.234")).toBeInTheDocument();
  });

  it("exposes the accessible label", () => {
    render(<Amount value={0} label="Saldo" />);
    expect(screen.getByLabelText("Saldo")).toHaveTextContent("$0");
  });
});
