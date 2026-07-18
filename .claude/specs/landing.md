# Spec — Landing "El Libro de Cuentas" (home route)

Origen del diseño: proyecto Claude Design `eed0a324` · archivo `Landing.dc.html`
(formato `.dc.html` con templating propio `x-dc`/`sc-for`/`{{ }}` → **hay que traducir a JSX**).

## Objetivo
Implementar la landing de marketing como **ruta home (`/`)**, adoptando el sistema de diseño
**paper-ledger** ("El Libro de Cuentas") como **tema global de la app** (reemplaza los tokens
indigo/teal actuales). Estética: papel crema cálido + tinta café, acentos terracota/oliva/arcilla/oro,
tipografías **Fraunces** (display/serif) + **Hanken Grotesk** (body). Copy: español chileno informal
("tú"), sin emoji.

## Alcance (esta feature)
1. **Adoptar tokens paper-ledger en `app/app.css`** (reemplazo del sistema actual).
2. **Cambiar las webfonts** en `app/root.tsx` (Inter → Fraunces + Hanken Grotesk).
3. **Reescribir la ruta home** (`app/routes/home.tsx`) como la landing.
4. **Tests** (TDD): actualizar `app/app.css.test.ts`, test de render de la landing, y ajustar
   e2e/home si rompe.

Fuera de alcance: toggle de tema claro/oscuro (los tokens dark quedan definidos pero la landing
renderiza claro por defecto), auth real, componentes reutilizables del design-system (esos van en
tickets aparte).

---

## 1. Tokens en `app/app.css`

Mantener Tailwind v4 (`@import "tailwindcss";`). Sustituir el bloque de tokens actual por el sistema
paper-ledger. Estructura requerida:

- **Palette cruda** (`:root`): papeles `--paper-50..400`, tinta `--ink-900/700/500`, acentos
  `--terracotta`, `--terracotta-dark`, `--olive`, `--olive-light`, `--clay`, `--clay-light`, `--gold`,
  y las tintas de categoría `--cat-*`. (Copiar valores del design system, ver más abajo.)
- **Semánticos LIGHT** (`:root`): `--surface-page/card/hover/sunken/invert`, `--on-invert`,
  `--border-hairline/rule/faint/field`, `--margin-line`, `--text-strong/body/muted/faint`,
  `--accent`, `--accent-hover`, `--on-accent`, `--income`, `--expense`, `--selection`.
- **Semánticos DARK**: bajo `[data-theme="dark"]` (attribute, **no** `prefers-color-scheme`).
- **Tipografía**: `--font-display: 'Fraunces', Georgia, serif;`
  `--font-body: 'Hanken Grotesk', -apple-system, 'Segoe UI', sans-serif;` + escala/tracking/weights.
- **Espaciado / efectos**: `--gutter: clamp(18px,3.5vw,28px)`, `--measure: 1120px`, radios
  (`--radius-sm 8 / --radius 10 / --radius-lg 13 / --radius-xl 14 / --radius-pill 999px`), sombras
  cálidas (`--shadow-card/float/cta`), `--ease: cubic-bezier(.2,.7,.3,1)`, `--dur: .2s`.
- **Base**: `html,body { background:var(--surface-page); color:var(--text-strong);
  font-family:var(--font-body); }`, `::selection`, `a`, `button`, `h1..h4 { font-family:var(--font-display) }`.
- **Puente Tailwind**: exponer en `@theme` al menos `--font-display`, `--font-body` y los colores
  semánticos clave (surface-card, accent, income, expense, text-*) para poder usar utilidades
  (`font-display`, `bg-*`, `text-*`). El componente puede combinar utilidades Tailwind + estilos
  inline para la geometría one-off (rotaciones, margen rojo de la tarjeta).

Valores exactos (raw palette light):
`--paper-50 #FBF6EA · --paper-100 #F5EDDB · --paper-200 #F1E8D6 · --paper-300 #EADFC6 · --paper-400 #E3D5BA`
`--ink-900 #3B3024 · --ink-700 #5b4f3e · --ink-500 #7a6a52`
`--terracotta #C2664A · --terracotta-dark #A9542F · --olive #5F7A45 · --olive-light #A8C07E ·
 --clay #B5532F · --clay-light #E59A7C · --gold #D9A441`
Dark: surface-page #221C15, card #2E2720, hover #383025, invert #17120D, on-invert #EFE6D3,
accent #D07A5C, accent-hover #E1906F, income=olive-light, expense=clay-light.
(El agente debe copiar el detalle completo desde `tokens/colors.css`/`effects.css` — resúmenes ya
recabados por el orquestador; disponibles bajo pedido.)

## 2. Fonts en `app/root.tsx`
Reemplazar el `<link>` de Inter (`root.tsx:28-39`) por preconnect + stylesheet de Google Fonts:
`https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap`

## 3. Ruta home — `app/routes/home.tsx`
Reemplazar el contenido starter por la landing. `meta()` mantiene título "El Libro de Cuentas"
(desc: "Anota cada peso y sabrás a dónde va."). Secciones, en orden:

1. **Grain overlay** — div fixed con la textura SVG (`opacity .05; mix-blend-mode:multiply`),
   siempre presente (el toggle `texturaPapel` del diseño se fija en `true`).
2. **Header/nav** (`max-width:1120px`): marca «El Libro *de Cuentas*» (Fraunces, "de Cuentas"
   itálica terracota) + botones «Iniciar sesión» (ghost) y «Crear cuenta» (ink sólido).
3. **Hero** (2 columnas, wrap): izquierda = tape eyebrow rotado «Tu cuaderno de finanzas», H1
   «Anota cada peso *y sabrás a dónde va.*» (clamp 38→72px), párrafo, CTA «Abrir mi libro»
   (terracota) + link «Probar como invitada →», nota «Gratis. Sin banco...». Derecha = **mock de
   tarjeta ledger** rotada `.8deg`, con margen rojo vertical, cabecera «Junio 2026 / +$953.410»
   y 5 filas de demo (día · desc · pill categoría con color · monto tabular con +/−), pie
   «asentado ✓».
4. **Features** (banda `--surface-card`): eyebrow «Cómo funciona», H2, grid auto-fit de 4 items
   (num 01–04, título, body) con borde-izq terracota.
5. **Philosophy** (2 col): eyebrow «Por qué a mano», H2 «Lo que anotas, *lo entiendes.*»,
   párrafo + lista de 3 principios con check SVG oliva.
6. **CTA final** (banda `--surface-invert`, texto crema): H2 «Empieza tu libro hoy.», párrafo,
   botón «Crear cuenta gratis», cita.
7. **Footer**: «El Libro de Cuentas · 2026» + «Hecho con papel, tinta y un poco de código.»

Datos demo (constantes en el componente, del `DCLogic` original):
- `INCOME=#5F7A45`, `EXPENSE=#B5532F` (o tokens income/expense).
- **demoRows**: {12 Proyecto freelance · Freelance #7E8B57 · +$300.000 income}, {8 Bencina ·
  Transporte #6E7A4B · −$25.000 expense}, {7 Feria verduras · Supermercado #B5532F · −$12.400
  expense}, {5 Sueldo · Sueldo #6E7A4B · +$1.200.000 income}, {1 Arriendo · Arriendo #C2664A ·
  −$450.000 expense}.
- **features**: 01 Registro / 02 Resumen / 03 Recurrentes / 04 Historial (copys del original).
- **principles**: «Sin conectar tu banco», «Rápido como un cuaderno», «Claridad, no gráficos de
  sobra» (copys del original).

Notas de traducción `.dc.html` → JSX:
- `sc-for list={{demoRows}}` → `demoRows.map(...)` con `key`.
- `sc-if value={{textura}}` → siempre render (grain fijo `true`).
- `style-hover="..."` → estados hover vía Tailwind (`hover:bg-...`) o CSS; no atributos inline.
- `{{ r.catColor }}` en `border`/`color` → estilo inline calculado por fila.
- Convertir todos los `style="..."` a `style={{}}` JSX (camelCase) o utilidades Tailwind; unidades
  como strings donde aplique.

## 4. Tests (TDD — test que falla primero)
- **`app/app.css.test.ts`**: reescribir. Ahora debe afirmar tokens paper-ledger:
  `--surface-card:`, `--accent:`, `--income:`, `--expense:`, `--font-display:`, `--font-body:`,
  `[data-theme="dark"]`, y que el fondo base usa `var(--surface-page)`. (Elimina asserts de
  `--color-brand-600` / `--ui-*` que ya no existen.)
- **`app/routes/home.test.tsx`** (nuevo, RTL, patrón `createRoutesStub` o render directo):
  afirmar que renderiza el H1 «Anota cada peso», los 4 títulos de feature (Registro/Resumen/
  Recurrentes/Historial), el CTA «Abrir mi libro» y el header «Junio 2026». (Test falla antes de
  implementar la landing.)
- **e2e `e2e/home.spec.ts`**: ajustar aserciones si dependían del contenido starter (p.ej. buscar
  el H1 de la landing / botón «Crear cuenta»).

## Criterios de aceptación
- [ ] `npm run typecheck` limpio.
- [ ] `npm test` verde (incluye css.test reescrito + home.test nuevo).
- [ ] `/` renderiza la landing paper-ledger con Fraunces+Hanken cargadas; sin restos indigo/teal.
- [ ] Montos con `+`/`−`, serif, `font-variant-numeric: tabular-nums`, formato CLP con separador
      de miles (punto), enteros sin decimales.
- [ ] Layout responsive (hero/features/philosophy hacen wrap en móvil vía los `clamp`/`flex-wrap`).
- [ ] Tokens dark definidos bajo `[data-theme="dark"]` (sin toggle en este ticket).
- [ ] Sin librerías nuevas.

## Casos borde
- Fuentes aún cargando: `font-display:swap` (fallback serif/sans, sin FOIT bloqueante).
- Texto largo en pills/desc: `min-width:0` + wrap; no romper la fila.
- El grain overlay no debe capturar clics (`pointer-events:none`) ni afectar SSR (render estable).
