import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "El Libro de Cuentas" },
    { name: "description", content: "Anota cada peso y sabrás a dónde va." },
  ];
}

const INCOME = "#5F7A45";
const EXPENSE = "#B5532F";

type DemoRow = {
  day: number;
  desc: string;
  cat: string;
  catColor: string;
  color: string;
  amount: string;
};

const demoRows: DemoRow[] = [
  {
    day: 12,
    desc: "Proyecto freelance",
    cat: "Freelance",
    catColor: "#7E8B57",
    color: INCOME,
    amount: "+$300.000",
  },
  {
    day: 8,
    desc: "Bencina",
    cat: "Transporte",
    catColor: "#6E7A4B",
    color: EXPENSE,
    amount: "−$25.000",
  },
  {
    day: 7,
    desc: "Feria verduras",
    cat: "Supermercado",
    catColor: "#B5532F",
    color: EXPENSE,
    amount: "−$12.400",
  },
  {
    day: 5,
    desc: "Sueldo",
    cat: "Sueldo",
    catColor: "#6E7A4B",
    color: INCOME,
    amount: "+$1.200.000",
  },
  {
    day: 1,
    desc: "Arriendo",
    cat: "Arriendo",
    catColor: "#C2664A",
    color: EXPENSE,
    amount: "−$450.000",
  },
];

const features = [
  {
    num: "01",
    title: "Registro",
    body: "Monto, descripción, categoría. Un renglón nuevo en tu libro, listo en segundos.",
  },
  {
    num: "02",
    title: "Resumen",
    body: "El mes repartido en barras claras: en qué se va la plata y cuánto queda.",
  },
  {
    num: "03",
    title: "Recurrentes",
    body: "Arriendo, sueldo, suscripciones. Lo fijo se asienta solo, cada mes.",
  },
  {
    num: "04",
    title: "Historial",
    body: "El libro mayor completo, con saldo acumulado y filtros por mes y categoría.",
  },
];

const principles = [
  {
    title: "Sin conectar tu banco",
    body: "Tus datos son tuyos. No pedimos claves ni permisos.",
  },
  {
    title: "Rápido como un cuaderno",
    body: "Anotar un gasto toma menos que sacar la boleta de la billetera.",
  },
  {
    title: "Claridad, no gráficos de sobra",
    body: "Solo los números que necesitas para decidir.",
  },
];

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="11.5" stroke="#5F7A45" />
      <path
        d="M7 12.5l3.2 3.2L17 8.5"
        stroke="#5F7A45"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      {/* (1) Grain overlay — siempre presente */}
      <div className="lc-grain" aria-hidden="true" />

      {/* (2) Header */}
      <header
        style={{
          maxWidth: "var(--measure)",
          margin: "0 auto",
          padding: "var(--space-5) var(--gutter)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-h4)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            color: "var(--text-strong)",
          }}
        >
          El Libro <i style={{ color: "var(--terracotta)" }}>de Cuentas</i>
        </span>
        <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <a
            href="/login"
            style={{
              fontSize: "var(--fs-small)",
              fontWeight: 500,
              color: "var(--text-body)",
              textDecoration: "none",
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius-pill)",
            }}
          >
            Iniciar sesión
          </a>
          <a
            href="/signup"
            style={{
              fontSize: "var(--fs-small)",
              fontWeight: 600,
              color: "var(--on-invert)",
              background: "var(--surface-invert)",
              textDecoration: "none",
              padding: "var(--space-2) var(--space-5)",
              borderRadius: "var(--radius-pill)",
            }}
          >
            Crear cuenta
          </a>
        </nav>
      </header>

      {/* (3) Hero */}
      <section
        className="lc-softin"
        style={{
          maxWidth: "var(--measure)",
          margin: "0 auto",
          padding: "var(--space-8) var(--gutter) var(--space-10)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(28px, 5vw, 64px)",
          alignItems: "center",
        }}
      >
        {/* izquierda */}
        <div style={{ flex: "1 1 380px", minWidth: 0 }}>
          <span
            style={{
              display: "inline-block",
              transform: "rotate(-1.6deg)",
              background: "rgba(217,164,65,.92)",
              color: "var(--ink-900)",
              fontSize: "var(--fs-eyebrow)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-eyebrow)",
              textTransform: "uppercase",
              padding: "6px 12px",
              borderRadius: "3px",
            }}
          >
            Tu cuaderno de finanzas
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 6.4vw, 72px)",
              lineHeight: "var(--lh-tight)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              margin: "var(--space-5) 0 var(--space-4)",
            }}
          >
            Anota cada peso{" "}
            <i style={{ color: "#C2664A" }}>y sabrás a dónde va.</i>
          </h1>
          <p
            style={{
              fontSize: "var(--fs-lead)",
              lineHeight: "var(--lh-body)",
              color: "var(--text-body)",
              maxWidth: "42ch",
              margin: "0 0 var(--space-6)",
            }}
          >
            Un libro de cuentas simple, como el de antes: apuntas tus gastos e
            ingresos, marcas lo que se repite y el resumen se hace solo.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "var(--space-5)",
              marginBottom: "var(--space-4)",
            }}
          >
            <a
              href="/signup"
              style={{
                fontSize: "var(--fs-base)",
                fontWeight: 600,
                color: "var(--on-accent)",
                background: "var(--accent)",
                textDecoration: "none",
                padding: "var(--space-4) var(--space-7)",
                borderRadius: "var(--radius-pill)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              Abrir mi libro
            </a>
            <a
              href="/guest"
              style={{
                fontStyle: "italic",
                fontSize: "var(--fs-base)",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              Probar como invitada →
            </a>
          </div>
          <p
            style={{
              fontSize: "var(--fs-caption)",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            Gratis. Sin banco, sin permisos, sin letra chica.
          </p>
        </div>

        {/* derecha — tarjeta ledger */}
        <div style={{ flex: "1 1 380px", minWidth: 0 }}>
          <div
            style={{
              position: "relative",
              background: "#FBF6EA",
              border: "1px solid #E3D5BA",
              borderRadius: "14px",
              transform: "rotate(.8deg)",
              boxShadow: "var(--shadow-float)",
              padding: "var(--space-6) var(--space-6) var(--space-5) var(--space-8)",
            }}
          >
            {/* línea de margen roja */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "17px",
                width: "1px",
                background: "rgba(194,102,74,.3)",
              }}
            />
            {/* cabecera */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                paddingBottom: "var(--space-4)",
                borderBottom: "1px solid var(--border-faint)",
                marginBottom: "var(--space-3)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-h4)",
                  fontWeight: 600,
                  color: "var(--text-strong)",
                }}
              >
                Junio 2026
              </span>
              <span
                className="tabular"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-lead)",
                  fontWeight: 600,
                  color: INCOME,
                }}
              >
                +$953.410
              </span>
            </div>
            {/* filas */}
            {demoRows.map((r) => (
              <div
                key={`${r.day}-${r.desc}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  padding: "var(--space-2) 0",
                }}
              >
                <div style={{ textAlign: "center", flexShrink: 0, width: "26px" }}>
                  <div
                    className="tabular"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-strong)",
                      lineHeight: 1,
                    }}
                  >
                    {r.day}
                  </div>
                  <div
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      color: "var(--text-faint)",
                      marginTop: "2px",
                    }}
                  >
                    JUN
                  </div>
                </div>
                <div
                  style={{
                    flex: "1 1 auto",
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--text-strong)",
                    }}
                  >
                    {r.desc}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: r.catColor,
                      border: `1px solid ${r.catColor}`,
                      borderRadius: "var(--radius-pill)",
                      padding: "1px 8px",
                      lineHeight: 1.5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {r.cat}
                  </span>
                </div>
                <span
                  className="tabular"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: r.color,
                    flexShrink: 0,
                  }}
                >
                  {r.amount}
                </span>
              </div>
            ))}
            {/* pie */}
            <div
              style={{
                textAlign: "right",
                fontStyle: "italic",
                fontSize: "var(--fs-caption)",
                color: "var(--text-muted)",
                marginTop: "var(--space-3)",
              }}
            >
              asentado ✓
            </div>
          </div>
        </div>
      </section>

      {/* (4) Features */}
      <section
        style={{
          background: "var(--surface-card)",
          borderTop: "1px solid var(--border-hairline)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--measure)",
            margin: "0 auto",
            padding: "var(--space-10) var(--gutter)",
          }}
        >
          <span
            style={{
              fontSize: "var(--fs-eyebrow)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-eyebrow)",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Cómo funciona
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-h2)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              margin: "var(--space-3) 0 var(--space-8)",
              maxWidth: "20ch",
            }}
          >
            Cuatro páginas, como un cuaderno de verdad.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "var(--space-7)",
            }}
          >
            {features.map((f) => (
              <div
                key={f.num}
                style={{
                  borderLeft: "1px solid rgba(194,102,74,.35)",
                  paddingLeft: "20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "30px",
                    fontWeight: 600,
                    color: "var(--terracotta)",
                  }}
                >
                  {f.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: 600,
                    margin: "var(--space-2) 0 var(--space-2)",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--fs-small)",
                    lineHeight: "var(--lh-body)",
                    color: "var(--text-body)",
                    margin: 0,
                  }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* (5) Philosophy */}
      <section
        style={{
          maxWidth: "var(--measure)",
          margin: "0 auto",
          padding: "var(--space-10) var(--gutter)",
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(28px, 5vw, 72px)",
        }}
      >
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <span
            style={{
              fontSize: "var(--fs-eyebrow)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-eyebrow)",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Por qué a mano
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-h2)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              margin: "var(--space-3) 0 var(--space-4)",
            }}
          >
            Lo que anotas, <i style={{ color: "var(--terracotta)" }}>lo entiendes.</i>
          </h2>
          <p
            style={{
              fontSize: "var(--fs-base)",
              lineHeight: "var(--lh-body)",
              color: "var(--text-body)",
              maxWidth: "40ch",
              margin: 0,
            }}
          >
            Nada de conectar tu banco ni categorías automáticas que no calzan.
            Cada movimiento lo asientas tú, en segundos, y por eso el saldo te
            lo crees.
          </p>
        </div>
        <ul
          style={{
            flex: "1 1 320px",
            minWidth: 0,
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
          }}
        >
          {principles.map((p) => (
            <li
              key={p.title}
              style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}
            >
              <CheckIcon />
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--fs-h4)",
                    fontWeight: 600,
                    margin: "0 0 4px",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--fs-small)",
                    lineHeight: "var(--lh-body)",
                    color: "var(--text-body)",
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* (6) CTA final */}
      <section
        style={{
          background: "var(--surface-invert)",
          color: "var(--on-invert)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--measure)",
            margin: "0 auto",
            padding: "var(--space-10) var(--gutter)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-h2)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "var(--on-invert)",
              margin: "0 0 var(--space-4)",
            }}
          >
            Empieza tu libro hoy.
          </h2>
          <p
            style={{
              fontSize: "var(--fs-lead)",
              lineHeight: "var(--lh-body)",
              color: "var(--on-invert)",
              opacity: 0.8,
              maxWidth: "44ch",
              margin: "0 auto var(--space-7)",
            }}
          >
            El primer renglón toma diez segundos. El hábito, un mes. La
            claridad, para siempre.
          </p>
          <a
            href="/signup"
            style={{
              display: "inline-block",
              fontSize: "var(--fs-base)",
              fontWeight: 600,
              color: "var(--on-accent)",
              background: "var(--accent)",
              textDecoration: "none",
              padding: "var(--space-4) var(--space-8)",
              borderRadius: "var(--radius-pill)",
              boxShadow: "var(--shadow-cta)",
            }}
          >
            Crear cuenta gratis
          </a>
          <p
            style={{
              fontStyle: "italic",
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-lead)",
              color: "var(--on-invert)",
              opacity: 0.7,
              marginTop: "var(--space-8)",
            }}
          >
            "Anota cada peso y sabrás a dónde va."
          </p>
        </div>
      </section>

      {/* (7) Footer */}
      <footer
        style={{
          maxWidth: "var(--measure)",
          margin: "0 auto",
          padding: "var(--space-7) var(--gutter)",
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-3)",
          justifyContent: "space-between",
          fontSize: "var(--fs-caption)",
          color: "var(--text-muted)",
        }}
      >
        <span>El Libro de Cuentas · 2026</span>
        <span>Hecho con papel, tinta y un poco de código.</span>
      </footer>
    </div>
  );
}
