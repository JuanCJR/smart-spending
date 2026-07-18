# Fibex Control — Refactor visual UI/UX

Prompts paso a paso para Claude Design (mesadecontrol.vercel.app)

---

## 0. Diagnóstico rápido de la UI actual

Recorrido de todas las vistas. Problemas de consistencia detectados:

- **Sin sistema de color.** Conviven azul (Dashboard), verde/teal (Monitor Diario, botones), morado/magenta (Fibex Play, columna TOTAL del heatmap, títulos de sección), rojo (Salir, escalados), amarillo (pill Soporte/NOC) y naranja. No hay jerarquía de acento ni significado semántico estable.
- **Dos lenguajes tipográficos.** Títulos en serif itálica (FIBEX CONTROL, NUEVA GESTIÓN, HISTORIAL GENERAL) chocan con cuerpo sans y labels en versalitas grises de bajo contraste.
- **Dos navegaciones compitiendo.** Pills arriba-izquierda (Mesa de Control / Fibex Telecom / Soporte-NOC) + nav arriba-derecha (Dashboard/Registro/Historial/Fibex Play/Admin/Salir).
- **Tarjetas y espaciado inconsistentes.** Distintos radios, bordes, paddings y densidades entre pantallas.
- **Mucho espacio muerto.** Gráficos vacíos, secciones sin datos, fondos negros largos al pie de página. Faltan estados vacíos/carga bien diseñados.
- **Gráficos poco legibles.** Leyendas repetidas ("casos" x6 solapadas), sin ejes claros, glows neón innecesarios.
- **Números métricos sin tabular-nums** ni jerarquía clara de "big number + contexto".

Objetivo: pasar de un tablero improvisado a una **consola de operaciones profesional** (telemetría / NOC telecom), coherente, densa en información pero ordenada, y que **no parezca plantilla genérica de IA**.

---

## 1. Dirección de diseño propuesta

**Concepto:** _Operations Console_ — una consola de inteligencia operativa para una mesa de control de telecom. Referencias de calidad: Linear, Vercel Dashboard, Datadog, Grafana, Stripe. Rigor de datos, densidad controlada, cero decoración gratuita.

**Sistema híbrido claro/oscuro** con design tokens (según tu elección): el oscuro es el modo por defecto (centro de monitoreo, pantallas grandes, turnos largos); el claro sirve para oficina, reportes e impresión. Ambos derivan del mismo set de tokens semánticos.

Principios:

1. **Un solo acento de marca (azul Fibex).** Todo lo demás es neutro. El color solo aparece cuando _significa_ algo (estado, categoría de dato).
2. **Paleta de estados semántica y fija**, idéntica en toda la app: Solucionado = verde, Soporte 2 = ámbar, Escalado NOC = rojo/rosa, Pendiente = azul, Neutro = gris.
3. **Una sola familia tipográfica.** Fuera la serif itálica. Números métricos con `tabular-nums`.
4. **Superficies por elevación con borde sutil**, sin sombras pesadas ni glows neón.
5. **Densidad de dashboard**, no de landing: menos aire vacío, más señal.
6. **Estados vacíos, de carga y de error diseñados** en cada módulo (hoy la app se ve "rota" cuando no hay datos).

---

## 2. PROMPT MAESTRO — Sistema de diseño

> Úsalo primero en Claude Design para fijar el sistema. Los prompts de cada page lo referencian ("usa el sistema de diseño Fibex Control definido antes").

```
Actúa como diseñador de producto senior especializado en dashboards de operaciones
y herramientas internas de datos. Vas a definir el sistema de diseño de "Fibex Control",
la consola de operaciones de una mesa de control / NOC de una empresa de telecom (Fibex Telecom).

OBJETIVO
Un sistema visual profesional, consistente y denso en información, tipo consola de
monitoreo (referencias: Linear, Vercel, Datadog, Grafana, Stripe). Debe verse como
software de operaciones serio, NO como una landing ni una plantilla genérica de IA.
Nada de gradientes decorativos, glows neón, serif itálica ni mezcla aleatoria de colores.

MODO CLARO Y OSCURO
Sistema híbrido con design tokens semánticos. Oscuro por defecto (centro de monitoreo),
claro para oficina/reportes. Los dos temas derivan del mismo set de tokens; nunca
hardcodees colores en los componentes, siempre vía token.

COLOR — tokens semánticos (define hex para light y dark):
- Superficies: bg (fondo app), surface (tarjeta), surface-elevated (panel/modal), border, border-subtle.
  Dark sugerido: bg #0B0F1A, surface #111826, elevated #171F30, border #232C40.
  Light sugerido: bg #F6F8FB, surface #FFFFFF, elevated #FFFFFF, border #E3E8F0.
- Texto: text-primary, text-secondary, text-muted (mín. contraste AA en ambos temas).
- Acento de marca (único): "brand" = azul Fibex, ~#2563EB (dark) / #1D4ED8 (light). Uso reservado
  a acciones primarias, elemento activo de navegación y foco. No lo uses como relleno decorativo.
- Estados semánticos FIJOS (mismos en toda la app):
    success / "Solucionado en Mesa"  = verde esmeralda #10B981
    warning / "Enviado a Soporte 2"  = ámbar #F59E0B
    danger  / "Escalado a NOC"        = rojo/rosa #F43F5E
    info    / "Pendiente Cliente"     = azul cielo #38BDF8
    neutral                            = gris (para "sin dato")
- Paleta categórica para gráficos (orden fijo, máx 6): brand, teal, ámbar, violeta, rosa, slate.
  Toda serie/segmento usa SIEMPRE el mismo color en toda la app.
- Escala de calor (heatmaps): rampa secuencial de 1 tono (p.ej. azul→magenta o transparente→rojo),
  no colores arbitrarios. La columna TOTAL usa el mismo sistema, no un morado suelto.

TIPOGRAFÍA — una sola familia:
- UI: Inter (o Geist / Söhne). Pesos 400/500/600/700. Sin serif, sin itálica.
- Números y métricas: misma familia con font-variant-numeric: tabular-nums.
- Escala tipográfica clara: display (métricas grandes), h1-h3, body, label (versalita SOLO en
  labels pequeños, con buen contraste), caption. Define tamaños/line-height/tracking.

ESPACIADO / FORMA:
- Escala base 4px (4/8/12/16/24/32/48).
- Radios: 12px tarjetas/paneles, 8px inputs/botones, 6px chips. Consistente.
- Elevación por borde sutil + sombra mínima; nada de glow neón.
- Grid de layout de 12 columnas, contenedor máx ~1440px, gutters consistentes.

COMPONENTES (define variantes y estados hover/focus/disabled/loading para cada uno):
- Top bar / navegación: UNIFICA las dos barras actuales en una sola. Izquierda: logo "Fibex Control"
  (wordmark limpio, sin itálica) + selector de contexto (Mesa de Control / Fibex Telecom / Soporte-NOC)
  como segmented control. Centro/derecha: navegación principal (Dashboard, Registro, Historial,
  Fibex Play, Admin) con item activo en acento brand. Extremo derecho: toggle tema + usuario + Salir.
- KPI / stat card: label pequeño arriba, número grande (tabular-nums), delta/meta y micro-contexto
  abajo, icono de estado discreto. Variante con sparkline.
- Panel de gráfico: header con título + subtítulo + acciones (rango, export); área de chart; leyenda
  limpia (sin repetir labels); estado vacío ("Sin datos para este periodo") y skeleton de carga.
- Tabla de datos: header sticky, filas con zebra sutil, celdas numéricas alineadas a la derecha con
  tabular-nums, chips de estado, densidad cómoda/compacta, ordenamiento, paginación, buscador,
  estado vacío y skeleton.
- Formulario: labels claros, inputs/selects/textarea consistentes, agrupación lógica, validación,
  ayudas contextuales, footer de acciones (primaria brand + secundaria ghost).
- Chip/Badge de estado usando los tokens semánticos.
- Botones: primario (brand, sólido), secundario (ghost/outline), destructivo (danger), sin gradientes.
- Mapa (Leaflet): marco consistente con las tarjetas, controles con estilo del sistema, tema del mapa
  acorde al modo claro/oscuro.
- Estados globales: empty state (icono + texto + acción), loading (skeletons), error, y toasts.

ENTREGABLE
Genera un tablero de estilo (style tile / design-system board) que muestre: paletas light y dark,
escala tipográfica, tokens de espaciado/radio, y todos los componentes anteriores en ambos temas.
No apliques todavía a pantallas concretas; esto es la base que reutilizarán los siguientes prompts.
```

---

## 3. PROMPTS POR PANTALLA

> Empieza cada uno con: _"Usa el sistema de diseño Fibex Control definido antes (tokens claro/oscuro, tipografía única, componentes)."_ Diséñalos en **modo oscuro y claro**.

### 3.1 — Dashboard · Monitor Diario

```
Diseña la pantalla "Dashboard — Monitor Diario" usando el sistema Fibex Control.
Es la vista operativa del día para la mesa de control de un ISP.

Estructura:
- Top bar unificada (ver sistema). Debajo, un toggle segmentado "Monitor Diario | Análisis Mensual"
  y un control de "Fecha de operación" (date picker) con botón "Volver a hoy".
- Fila de 5 KPI cards, cada una con label, número grande (tabular-nums) y contexto/meta:
  Clientes Atendidos (total registrado), Efectividad Mesa % (vs meta), Enviado a Soporte 2 (casos),
  Escalado a NOC (vs meta), Pendiente Cliente (meta). Cada card lleva su color de estado semántico
  discreto (success/warning/danger/info), no relleno pleno.
- Dos paneles lado a lado:
  · "Resumen por operador": tabla (Operador, Clientes, Mesa, Soporte 2, NOC) con chips/estados y
    totales; incluir buscador si crece. Debajo, botón primario "Generar reporte Telegram".
  · "Distribución de resultados": donut/pie de cómo se cerró cada gestión, con leyenda limpia
    (una entrada por categoría, colores de la paleta categórica fija) y total al centro.
- Dos paneles inferiores:
  · "Top 5 Averías": bar chart horizontal de motivos con mayor volumen hoy.
  · "Radar de Operaciones": feed de actividad del equipo en tiempo real (timeline con avatar,
    operador, acción, hora).
Diseña los estados vacíos (hoy la vista se ve rota con 0 datos): skeletons de carga y empty states
con mensaje + icono ("Aún no hay gestiones hoy"). Densidad de dashboard, responsive a 2/1 columnas.
```

### 3.2 — Dashboard · Análisis Mensual

```
Diseña la pantalla "Dashboard — Análisis Mensual" usando el sistema Fibex Control.
Vista analítica/consolidada por mes.

Estructura:
- Mismo header con toggle "Monitor Diario | Análisis Mensual" (activo aquí) y un "Filtro Mensual"
  (selector de mes, p.ej. Mayo 2026).
- Fila de 3 tarjetas grandes: Volumen Mensual (número), Efectividad Global (% + badge "N resueltos" +
  "Meta de equipo: 65%" con barra de progreso), Escalados NOC (número). Números con tabular-nums.
- Gráfico de barras apiladas por mes (Febrero…Mayo): "Gestiones Resueltas" vs "Resto de Gestiones",
  ejes legibles, tooltip claro, colores de la paleta fija. Leyenda limpia.
- "HeatMap Mensual de Incidencias — Mapa de calor Mesa de Control": tabla matriz Zona (filas: Canaima,
  Caraballeda, Caribe, Catia La Mar, La Guaira, Macuto, Maiquetía, etc.) × Motivo (columnas: Falla LOS,
  Internet Lento, Sin Internet, Usuario Clave GNT, Caídas Seguidas, No Navega) + columna TOTAL.
  Usa una rampa secuencial de UN tono para la intensidad de las celdas (no morado aislado); la columna
  TOTAL con el mismo sistema, header sticky, buscador de zona y densidad compacta legible.
Incluye estados de carga/vacío. Responsive: la matriz con scroll horizontal en pantallas chicas.
```

### 3.3 — Registro · Nueva Gestión

```
Diseña la pantalla "Registro — Nueva Gestión" usando el sistema Fibex Control.
Es el formulario con el que un operador registra una gestión en la base de datos.

Estructura (layout de 2 columnas de formulario + rail lateral):
- Título "Nueva Gestión" + subtítulo "Registro directo en la base de datos".
- Campos: Fecha (date), Operador (automático, mostrado como campo de solo lectura con el usuario
  logueado), Abonado (texto), Teléfono (ej. 0412…), Detalle de Orden (select "Seleccionar motivo"),
  Solución Aplicada (select), Resultado (select, def. "Solucionado en Mesa"), Tipo Resolución
  (select, def. "Mesa"), Requiere Visita (toggle/segmented Sí/No).
- Bloque de ubicación: input "Pin de ubicación / coordenadas de Google Maps" + botón "Capturar GPS",
  y un mapa (Leaflet) integrado con el estilo del sistema (marco = tarjeta, tema acorde a claro/oscuro).
- Campos finales: Zona del Reporte (select), Motivo de la Incidencia (select), Observación del SAE
  (textarea). Footer de acciones: "Limpiar" (ghost) + "Guardar" (primario brand).
- Rail lateral "Estado del Sistema": tres items con icono y estado — Persistencia (gestiones en tiempo
  real), Dashboard vivo (métricas se actualizan solas), Seguridad (middleware protege rutas).
Diseña validación de campos, estados focus/error, y confirmación de guardado (toast). Formulario
ordenado en grupos lógicos, no una lista suelta. Responsive: 1 columna en móvil, rail debajo.
```

### 3.4 — Historial General

```
Diseña la pantalla "Historial General" usando el sistema Fibex Control.
Es la sábana completa de gestiones registradas.

Estructura:
- Header con título "Historial General" + subtítulo, y una barra de utilidades: buscador
  ("Buscar abonado, operador…"), filtro por fecha, y botón "Exportar CSV" (secundario).
- Tabla de datos principal con columnas: Fecha, Operador, Abonado, Teléfono, Detalle de Orden,
  Solución Aplicada (y opcional: Resultado con chip de estado, Zona). Header sticky, celdas de fecha/
  número alineadas y con tabular-nums, chips de estado semánticos, ordenamiento por columna, filas con
  zebra sutil, densidad compacta y paginación.
- Diseña con cuidado el ESTADO VACÍO ("No se encontraron registros") con icono + mensaje + sugerencia,
  y el skeleton de carga. Considerar vista de detalle (drawer lateral al hacer click en una fila).
Responsive: en móvil, convertir filas en tarjetas apiladas legibles.
```

### 3.5 — Fibex Play · Grilla en Vivo

```
Diseña la pantalla "Fibex Play — Grilla en Vivo" usando el sistema Fibex Control.
Monitoreo del estado de la grilla de canales de TV/streaming.

Estructura:
- Toggle segmentado "Grilla en Vivo | Gestión de Clientes" (activo: Grilla en Vivo).
- Fila de 3 KPI cards: Canales Totales (ej. 165), Salud de Grilla (% con anillo de progreso,
  "N operativos"), Canales Caídos (con color danger cuando > 0).
- Dos paneles: "Distribución de Fallas" (chart; estado vacío "Grilla 100% estable") y "Detalles de
  Falla" (lista de canales afectados con severidad; vacío = "Sin detalles").
- Panel inferior "Reporte de Novedades en Grilla": encabezado "Monitoreo en vivo · <fecha>", y un
  estado de salud destacado ("Grilla 100% operativa") con check; cuando haya fallas, lista/timeline
  de incidencias por canal con hora y severidad.
Diseña el estado "todo operativo" para que se vea intencional y confiable (no vacío/roto). Usa el
verde success solo para el estado sano y rojo danger para caídos. Responsive a 2/1 columnas.
```

### 3.6 — Fibex Play · Gestión de Clientes

```
Diseña la pantalla "Fibex Play — Gestión de Clientes" usando el sistema Fibex Control.
Bitácora de atención a reportes de clientes por la app Fibex.

Estructura:
- Toggle segmentado "Grilla en Vivo | Gestión de Clientes" (activo: Gestión de Clientes).
- Fila de 3 KPI cards: Total Atendidos (registros actuales), Solucionados (gestión exitosa, success),
  Escalados (requieren 2do nivel, warning/danger).
- Dos paneles: "Top Canales Reportados (App Fibex)" (bar/list ranking; vacío = "Aún no hay reportes de
  canales") y "Origen del Problema" (donut o barras; vacío = "Sin datos").
- Panel "Bitácora de Atención App": tabla (Operador, Abonado, Canal, Motivo, Solución, acción Borrar)
  con chips de estado y botón primario "+ Nuevo Registro" (abre modal/drawer con el formulario).
Diseña el modal de nuevo registro, la confirmación de borrado, estados vacío y skeleton. Responsive:
tabla → tarjetas en móvil.
```

### 3.7 — Admin · Supervisión

```
Diseña la pantalla "Admin — Supervisión" usando el sistema Fibex Control.
Vista de supervisión/auditoría para responsables de la mesa.

Estructura:
- Header con "Fecha Auditoría" (date picker) alineado a la derecha.
- Panel "Control de Zonas — La Guaira": mapa (Leaflet, capa satelital) a ancho completo enmarcado como
  tarjeta, con leyenda de zonas y, si aplica, marcadores/overlays de incidencias por zona coloreados
  con los estados semánticos. Controles de zoom con estilo del sistema.
- Sección "Supervisión: Resumen Operativo (<fecha>)": tarjetas resumen de KPIs del día para el
  supervisor (atendidos, efectividad, escalados, SLA).
- Dos paneles inferiores:
  · "Bandeja Nivel 2 (Pendientes)" con contador (badge): lista de órdenes pendientes de 2do nivel;
    estado vacío "¡Todo limpio! No hay órdenes pendientes en Nivel 2." bien diseñado.
  · "Órdenes / SLA": tabla Cantidad × Días Pendientes (0 días, 1 día, 2 días, 3 días, 4+ días) con
    codificación por color de SLA (verde→ámbar→rojo según antigüedad), usando los tokens semánticos.
Elimina el espacio muerto del final de la página (hoy hay grandes zonas negras vacías): ajusta el
layout para que el contenido llene la grilla de forma equilibrada. Responsive a 1 columna.
```

---

## 4. Cómo usarlos

1. Ejecuta primero el **Prompt Maestro** para fijar tokens, tipografía y componentes en ambos temas.
2. Genera cada pantalla con su prompt, empezando la frase con _"Usa el sistema de diseño Fibex Control definido antes…"_ para heredar la consistencia.
3. Pide siempre **modo claro y oscuro** y los **estados vacío/carga/error**, que es donde la app actual falla más.
4. Al final, valida que: un solo acento de marca, estados semánticos consistentes, una sola tipografía con tabular-nums, y navegación unificada aparezcan idénticos en todas las pantallas.
