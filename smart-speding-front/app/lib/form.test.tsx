import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

interface Fields {
  amount: string;
}

function SampleForm({ onValid }: { onValid: (v: Fields) => void }) {
  const { register, handleSubmit } = useForm<Fields>({
    defaultValues: { amount: "" },
  });
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <label htmlFor="amount">Monto</label>
      <input id="amount" {...register("amount")} />
      <button type="submit">Guardar</button>
    </form>
  );
}

describe("react-hook-form", () => {
  it("collects field values and submits them", async () => {
    const onValid = vi.fn();
    render(<SampleForm onValid={onValid} />);

    await userEvent.type(screen.getByLabelText("Monto"), "1234");
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onValid).toHaveBeenCalledWith(
      expect.objectContaining({ amount: "1234" }),
      expect.anything(),
    );
  });
});
