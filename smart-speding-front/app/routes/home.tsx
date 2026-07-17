import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Spending" },
    { name: "description", content: "Controla tus gastos personales en CLP." },
  ];
}

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Smart Spending</h1>
      <Welcome />
    </>
  );
}
