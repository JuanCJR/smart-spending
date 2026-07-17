/**
 * Formats a number as a Chilean Peso (CLP) amount: thousands separated by
 * dots, no decimals, symbol prefixed. Negative amounts keep the sign before
 * the symbol (e.g. `-$1.234`). Non-integer inputs are rounded to the nearest
 * integer.
 */
export function formatCLP(n: number): string {
  const rounded = Math.round(n);
  const sign = rounded < 0 ? "-" : "";
  const abs = Math.abs(rounded);
  const grouped = abs.toLocaleString("es-CL");
  return `${sign}$${grouped}`;
}
