# Smart Spending

App web de finanzas personales enfocada en el **registro ultra-rápido de gastos** (montos en **CLP**).
Monorepo simple con dos proyectos hermanos bajo un único repositorio git:

| Carpeta | Stack | Puerto dev |
|---|---|---|
| [`smart-speding-front/`](./smart-speding-front) | React 19 · Vite · **React Router v7 (framework mode, SSR)** · Tailwind v4 · React Query · Zustand · React Hook Form | `5173` |
| [`smart-speding-back/`](./smart-speding-back) | Node · **NestJS 11** · TypeScript · **Prisma 6 + PostgreSQL** | `3000` |

> El desarrollo sigue una metodología de **subagentes + SDD + TDD**. Antes de programar, lee
> [`CLAUDE.md`](./CLAUDE.md) y [`.claude/WORKFLOW.md`](./.claude/WORKFLOW.md).

---

## 1. Requisitos previos

- **Node.js ≥ 20** (recomendado LTS) y **npm** — `node -v`
- **Docker** + **Docker Compose** (para la base de datos PostgreSQL local)
- **git**

---

## 2. Clonar el repositorio

Este es **un solo repo** (los scaffolds fueron aplanados: no hay submódulos). Un clon trae todo —
código, agentes de Claude Code y skills:

```bash
git clone <URL-del-repo> smart-spending
cd smart-spending
```

Verás la infraestructura de agentes ya versionada:

```
smart-spending/
├── CLAUDE.md                 # reglas de orquestación + principios
├── .claude/
│   ├── agents/               # frontend-dev, backend-dev
│   ├── skills/               # prisma-postgres-setup (symlink → .agents/skills)
│   ├── specs/                # specs SDD (plantilla + features)
│   └── WORKFLOW.md           # ciclo SDD + TDD
├── smart-speding-front/
└── smart-speding-back/
```

> ⚠️ **No hagas `git init` dentro de las subcarpetas.** El repo raíz ya las trackea; un `.git`
> anidado las convertiría en submódulos rotos.

---

## 3. Configuración inicial

Los dos proyectos son independientes: se instalan y configuran por separado.

### 3.1 Backend (`smart-speding-back`)

```bash
cd smart-speding-back

# 1. Dependencias (el postinstall corre `prisma generate` automáticamente)
npm install

# 2. Variables de entorno
cp .env.example .env
```

`.env` (valores por defecto, alineados con `docker-compose.yml`):

```env
DATABASE_URL="postgresql://smart_spending:smart_spending@localhost:5432/smart_spending?schema=public"
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
```

```bash
# 3. Levantar PostgreSQL local (contenedor)
docker compose up -d db

# 4. Aplicar el esquema Prisma a la base
npx prisma migrate dev
```

> Aún **no hay modelos de dominio** (la infra es base; `Expense` llega con el spec
> `registrar-gasto`). `prisma migrate dev` deja la base lista para las primeras migraciones.

### 3.2 Frontend (`smart-speding-front`)

```bash
cd smart-speding-front

# 1. Dependencias
npm install

# 2. Navegadores de Playwright (solo la primera vez, para los e2e)
npx playwright install chromium
```

No requiere `.env` en esta etapa.

---

## 4. Levantar la app en desarrollo

Abre **dos terminales**:

```bash
# Terminal 1 — API (con PostgreSQL ya arriba vía docker compose)
cd smart-speding-back && npm run start:dev      # http://localhost:3000

# Terminal 2 — Web
cd smart-speding-front && npm run dev            # http://localhost:5173
```

Verificación rápida del backend:

```bash
curl http://localhost:3000/health     # → {"status":"ok"}
```

---

## 5. Tests

### Backend
```bash
cd smart-speding-back
npm test              # unit (Jest)
npm run test:e2e      # e2e (supertest) — incluye smoke de /health
npm run test:cov      # cobertura
```

### Frontend
```bash
cd smart-speding-front
npm run test          # unit/componente (Vitest + React Testing Library)
npm run test:watch    # modo watch
npm run test:e2e      # e2e (Playwright) — levanta el dev server en :5173
npm run typecheck     # react-router typegen + tsc
```

---

## 6. Scripts de referencia

| | Backend | Frontend |
|---|---|---|
| Dev | `npm run start:dev` | `npm run dev` |
| Build | `npm run build` | `npm run build` |
| Prod | `npm run start:prod` | `npm run start` |
| Lint / Format | `npm run lint` · `npm run format` | `npm run typecheck` |
| Tests | `npm test` · `npm run test:e2e` | `npm run test` · `npm run test:e2e` |

---

## 7. Base de datos (Docker)

```bash
docker compose up -d db      # levantar Postgres 16
docker compose ps            # ver estado / healthcheck
docker compose down          # detener (conserva datos en el volumen)
docker compose down -v       # detener y BORRAR datos
```

Credenciales locales (definidas en `smart-speding-back/docker-compose.yml`):
`smart_spending` / `smart_spending` / db `smart_spending` en `localhost:5432`.

---

## 8. Metodología de desarrollo (subagentes + SDD + TDD)

Este repo está preparado para desarrollarse con **Claude Code** orquestando subagentes:

- **Orquestador** = la sesión principal: planifica, escribe specs y delega. No implementa.
- **`frontend-dev` / `backend-dev`** = especialistas que investigan e implementan bajo **TDD**
  (test que falla → código mínimo → refactor) y devuelven resúmenes.
- Toda feature parte de un **spec aprobado** en `.claude/specs/` (usa `_TEMPLATE.md`).

Flujo completo en [`.claude/WORKFLOW.md`](./.claude/WORKFLOW.md); reglas en [`CLAUDE.md`](./CLAUDE.md).

---

## 9. Troubleshooting

- **`prisma migrate` falla / no conecta** → asegúrate de que el contenedor está sano
  (`docker compose ps`) y que `DATABASE_URL` en `.env` coincide con `docker-compose.yml`.
- **CORS en el front** → el backend habilita CORS para `FRONTEND_ORIGIN`; si cambias el puerto
  del front, actualiza esa variable en `.env` y reinicia la API.
- **Playwright: "browser not found"** → corre `npx playwright install chromium`
  (o `--with-deps chromium` en Linux/CI para las libs de sistema).
- **git ve las subcarpetas como submódulos** → quedó un `.git` anidado; elimínalo
  (`rm -rf smart-speding-*/.git`) y vuelve a `git add -A`.
