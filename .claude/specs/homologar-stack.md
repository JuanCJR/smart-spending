# Spec: Homologar el stack — dejar los repos listos para features

- **Slug:** `homologar-stack`
- **Estado:** ✅ Hecho (2026-07-17) — suites en verde; ver nota de verificación al final
- **Verificación del orquestador:** back `npm test` 5/5 · `test:e2e` 1/1 · `build` OK · `lint` OK ·
  front `npm run test` 11/11 · `typecheck` OK · Playwright home e2e 1/1 (verificado por el especialista).
  **Pendiente único:** e2e del back contra **Postgres real** — no hay Docker en este entorno; el
  e2e de `/health` corre con `PrismaService` stub. Para cerrarlo cuando haya Docker:
  `docker compose up -d db && npx prisma migrate dev && npm run test:e2e`.
- **Dominio(s):** ambos (front + back), independientes
- **Ticket(s) derivados:**
  - `back-0` → `backend-dev`: NestJS listo (Prisma/PostgreSQL, validación, config, CORS, tests)
  - `front-0` → `frontend-dev`: front listo (Vitest/RTL, React Query/Zustand/RHF, Playwright, tests)

> Este es el **primer spec de validación** de la metodología. No entrega una feature de negocio:
> deja ambos repos con el stack objetivo instalado, cableado y **verificado con un smoke test que
> pasa**. Sin modelos de dominio ni endpoints de negocio (eso vive en `registrar-gasto.md`).

## 1. Objetivo
Que cualquier feature futura arranque sin fricción: dependencias del stack objetivo instaladas,
configuración base cableada y una suite de tests mínima **en verde** en cada repo, de modo que el
ciclo SDD+TDD pueda correr de inmediato.

## 2. Criterios de aceptación

### Backend (`back-0`)
- [ ] **Prisma + PostgreSQL** instalados; `prisma/schema.prisma` con datasource `postgresql` y generator. **Sin modelos de dominio** (solo la base; opcional un modelo placeholder si la migración lo requiere).
- [ ] `PrismaModule` + `PrismaService` (con `onModuleInit`/`enableShutdownHooks`) creados y registrados en `AppModule`.
- [ ] `@nestjs/config` cargando `.env`; existe **`.env.example`** con `DATABASE_URL`.
- [ ] `ValidationPipe` global (whitelist + transform) activo; `class-validator` y `class-transformer` instalados.
- [ ] **CORS** habilitado para el origen del front.
- [ ] `GET /health` responde **200** con `{ status: 'ok' }` (endpoint de humo, no de negocio).
- [ ] **Estrategia de DB de test documentada** y funcionando para los tests que tocan Prisma.
- [ ] `npm test` (Jest unit) y `npm run test:e2e` (supertest) **pasan**; el e2e de `/health` verifica el arranque con la config real.
- [ ] `npm run build` y `npm run lint` **pasan**.

### Frontend (`front-0`)
- [ ] **Vitest + React Testing Library + jsdom** instalados y configurados para RR v7 framework mode (Vite); scripts `test` y `test:watch` en `package.json`.
- [ ] Un **smoke test** de componente (RTL) **pasa**.
- [ ] **React Query** instalado; `QueryClientProvider` cableado en `app/root.tsx`; un test renderiza un componente que usa `useQuery` con su wrapper y pasa.
- [ ] **Zustand** y **React Hook Form** instalados e importables (un test trivial de store/form pasa).
- [ ] **Playwright** instalado + config + **un e2e trivial** que carga la home y verifica un texto (ver decisión de alcance §7).
- [ ] `npm run typecheck` **pasa**; `npm run test` **en verde**.
- [ ] Utilidad de **formato CLP** (`$1.234`, miles, sin decimales) con su test unitario — pieza transversal que las features reutilizarán.

## 3. Contratos (API / tipos)
- Backend expone `GET /health → 200 { status: 'ok' }` (único contrato de este spec).
- Frontend: helper `formatCLP(n: number): string` en `app/lib/` (o equivalente), con firma estable.

## 4. Casos borde y validaciones
- `formatCLP(0)` → `"$0"`; negativos → `"-$1.234"`; no enteros → redondeo a entero.
- `ValidationPipe` con `whitelist:true` descarta props no declaradas (se prueba al llegar la primera feature; aquí basta con que esté activo y el e2e de `/health` no rompa).
- Arranque sin `.env` → mensaje claro (config con validación básica de env).

## 5. Fuera de alcance
- Modelo `Expense`, `POST /expenses`, formulario de gasto → `registrar-gasto.md`.
- Autenticación, CI/CD, despliegue.
- Componentes de UI de negocio.

## 6. Plan de tests (rojo primero)
- **Back:** e2e `GET /health` (rojo hasta crear el endpoint+config); unit `PrismaService` conecta/desconecta (o mock según estrategia de DB).
- **Front:** test de render del smoke component; test de `useQuery` con `QueryClientProvider`; test unit de `formatCLP` (rojo primero).

## 7. Notas de homologación / decisiones cerradas
- **Provisión de PostgreSQL:** ✅ **docker-compose local**. `backend-dev` añade `docker-compose.yml`
  con Postgres para dev/test; los e2e corren contra esa DB. `.env.example` con `DATABASE_URL`
  apuntando al servicio local.
- **Playwright:** ✅ **se instala en este spec**. Config + un e2e trivial que carga la home.
- `back-0` y `front-0` son **independientes**: se delegan en paralelo.
