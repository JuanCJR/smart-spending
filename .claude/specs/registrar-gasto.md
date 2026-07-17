# Spec: Registrar un gasto

- **Slug:** `registrar-gasto`
- **Estado:** 🚦 Borrador (esperando aprobación)
- **Dominio(s):** ambos (front + back)
- **Ticket(s) derivados:**
  - `back-1` → `backend-dev`: endpoint `POST /expenses` + persistencia Prisma
  - `front-1` → `frontend-dev`: formulario de registro rápido que consume el endpoint

## 1. Objetivo
Permitir al usuario **registrar un gasto en segundos**: monto en CLP, categoría y fecha, con
foco automático y guardado inmediato. Es la acción central de Smart Spending; todo lo demás
(listar, resumir) se construye sobre este flujo.

## 2. Criterios de aceptación
- [ ] `POST /expenses` con body válido crea el gasto y responde **201** con el gasto creado (incluye `id` y `createdAt`).
- [ ] `amount` es un **entero CLP > 0** (sin decimales); valores ≤ 0, no enteros o ausentes → **400**.
- [ ] `category` es obligatoria (string no vacío); ausente/vacía → **400**.
- [ ] `date` es opcional; si falta, el backend usa la fecha actual del servidor.
- [ ] El gasto queda **persistido en PostgreSQL** vía Prisma (verificable leyéndolo tras crearlo).
- [ ] El formulario front envía el gasto, muestra confirmación y **limpia el campo de monto dejándolo enfocado** para el siguiente registro.
- [ ] Monto se muestra formateado como CLP (`$1.234`, separador de miles, sin decimales).
- [ ] Error del backend (400/500) → el formulario muestra mensaje y **no** pierde lo tecleado.

## 3. Contratos (API / tipos)
Fuente de verdad compartida front↔back.
```ts
// Tipo de dominio
type Expense = {
  id: string;            // uuid
  amount: number;        // entero CLP, > 0
  category: string;      // no vacío
  date: string;          // ISO 8601 (yyyy-mm-dd)
  createdAt: string;     // ISO 8601 datetime
};

// Request
type CreateExpenseDto = {
  amount: number;        // entero > 0
  category: string;      // no vacío
  date?: string;         // ISO 8601; default = hoy (servidor)
};

// Endpoint
// POST /expenses
//   201 → Expense
//   400 → { statusCode: 400, message: string[] }  (validación)
```

## 4. Casos borde y validaciones
- `amount` = 0, negativo, decimal, string, ausente → 400 con mensaje claro.
- `category` = "" o solo espacios → 400.
- `date` con formato inválido → 400; `date` ausente → hoy.
- Fallo de conexión a la DB → 500 (el front lo trata como error recuperable, conserva el input).

## 5. Fuera de alcance
- Listado/edición/borrado de gastos.
- Autenticación / multiusuario (por ahora, un solo usuario implícito).
- Categorías predefinidas / catálogo (la categoría es texto libre en esta iteración).
- Moneda distinta de CLP.

## 6. Plan de tests (rojo primero)
- **Back (`backend-dev`, Jest + supertest):**
  - unit del service: crea con defaults (date=hoy), rechaza amount≤0 y category vacía.
  - e2e `POST /expenses`: 201 con body válido; 400 en cada caso inválido; el registro se lee de la DB.
- **Front (`frontend-dev`, Vitest + RTL; e2e opcional Playwright):**
  - render: el campo de monto está enfocado al montar.
  - submit válido → llama a la API, muestra confirmación, limpia y re-enfoca el monto.
  - respuesta 400 → muestra error y conserva lo tecleado.
  - formateo CLP del monto mostrado.

## 7. Notas de homologación de stack
Este ticket **estrena** partes del stack objetivo aún ausentes → cada especialista las instala y
verifica con un test (avisando al orquestador antes de instalar):
- **back-1:** añadir **Prisma + PostgreSQL** (modelo `Expense`, migración inicial). Apóyate en el
  skill `prisma-postgres-setup` y en context7.
- **front-1:** añadir **Vitest + React Testing Library** (y config para RR v7 framework mode);
  data-fetching con **React Query** para el POST; formulario con **React Hook Form**.
