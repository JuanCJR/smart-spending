# Smart Spending — Reglas del proyecto

App web de finanzas personales enfocada en **registro ultra-rápido de gastos** (montos en **CLP**,
enteros sin decimales, separador de miles). El repo contiene dos proyectos hermanos bajo un mismo
git raíz:

- `smart-speding-front/` — React · Vite · TypeScript · **React Router v7 (framework mode, SSR)** ·
  Tailwind CSS v4 · React Query · Zustand · React Hook Form · Vitest · React Testing Library · Playwright
- `smart-speding-back/` — Node.js · NestJS · TypeScript · Prisma · PostgreSQL · Jest · supertest

> El scaffold actual aún no tiene todo el stack objetivo instalado. **Homologar el stack es trabajo
> de los subagentes**, ticket por ticket y con tests — no una migración de golpe.

---

## Orquestación (la sesión principal es el orquestador)

La **sesión principal orquesta**: planifica, escribe/valida specs, delega e integra. **No implementa
features.** No existe un agente "orquestador" (un subagente no puede delegar en otros subagentes).

### Subagentes disponibles (`.claude/agents/`)
- **`frontend-dev`** — investiga e implementa el front bajo TDD. Devuelve resumen.
- **`backend-dev`** — investiga e implementa el back bajo TDD. Devuelve resumen.
- Para descubrimiento read-only transversal y barato, puedes usar el agente **`Explore`** integrado.

### Principios rectores (no negociables)
1. **Un trabajo por agente.** Delega al especialista del dominio correcto; nada de tareas hace-todo.
2. **Higiene de contexto.** El orquestador **no lee árboles ni archivos completos** si puede delegar
   el descubrimiento. Los especialistas devuelven **resúmenes accionables (≤40 líneas)** con
   `ruta:línea`, nunca volcados de archivos. No re-leas lo que un especialista ya te resumió.
3. **Herramientas mínimas por agente.** Cada subagente declara solo las tools que necesita.
4. **SDD antes que código.** Ninguna implementación arranca sin un **spec aprobado** (`.claude/specs/`).
5. **TDD dentro de cada implementación.** Test que falla → código mínimo → refactor. El test primero.
6. **Puertas humanas 🚦.** Detente y pide aprobación en: (a) el spec, antes de implementar;
   (b) instalar dependencias nuevas o skills; (c) cualquier acción que descargue contenido externo.
7. **Docs de librerías → context7.** Usa el CLI `npx ctx7@latest` (o el skill `find-docs`) para
   API/config actuales de librerías; no dependas de la memoria del modelo.

### El orquestador escribe SOLO
Specs (`.claude/specs/…`) y documentación de proyecto (`CLAUDE.md`). **El código de feature lo
escriben los especialistas.** Respeta el stack indicado; no introduzcas librerías nuevas sin
justificarlo y pedir aprobación.

---

## Flujo de un ticket (SDD + TDD, punta a punta)

1. **SPEC** — el orquestador redacta `.claude/specs/<slug>.md` (objetivo, criterios de aceptación,
   contratos de API/tipos, casos borde). → 🚦 aprobación humana.
2. **Investigación** — delega a `frontend-dev`/`backend-dev` (o `Explore`); recibe **resumen**.
3. **TDD** — el especialista escribe **primero el test que falla**, luego el código mínimo, luego refactor.
4. **Verificación** — el orquestador corre/valida la suite y contrasta contra los criterios de aceptación.
5. **Integración** — el orquestador consolida (front + back) y reporta.

Comandos de referencia:
- Front: `cd smart-speding-front && npm run dev | npm run typecheck` (Vitest/Playwright al homologar).
- Back: `cd smart-speding-back && npm run start:dev | npm test | npm run test:e2e`.
