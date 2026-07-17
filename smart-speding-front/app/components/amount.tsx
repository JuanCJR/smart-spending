import { formatCLP } from "~/lib/format";

export interface AmountProps {
  value: number;
  label?: string;
}

/**
 * Smoke/example component: renders a CLP amount. Kept intentionally trivial —
 * business UI lives in feature specs, not in `front-0`.
 */
export function Amount({ value, label }: AmountProps) {
  return (
    <span role="text" aria-label={label}>
      {formatCLP(value)}
    </span>
  );
}
