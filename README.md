# 📚 SQL Docs — Fundamentos de Base de Datos 1

Plataforma web de documentación técnica interactiva y minimalista orientada al aprendizaje de los conceptos fundamentales de SQL para la materia de **Base de Datos 1**.

Inspirada en el diseño y experiencia de usuario de documentaciones oficiales modernas (como Stripe Docs, VitePress y Tailwind Docs), implementada con una paleta pastel funcional (azul, amarillo y rojo) y navegación fluida.

---

## 👥 Equipo de Desarrollo y Asignación de Módulos

El proyecto está dividido en 4 módulos esenciales, cada uno con un desarrollador asignado como responsable técnico:

| Módulo | Tema Técnico | Responsable | Estado |
| :--- | :--- | :--- | :--- |
| **Módulo 1** | **Creación de Base de Datos y Tablas** (`CREATE DATABASE`, `USE`, `CREATE TABLE`, tipos de datos, llaves primarias/foráneas, restricciones). | 👤 **David Párraga** | 🟢 **Completado** |
| **Módulo 2** | **Inserción de Datos con SQL** (`INSERT INTO` fila única, inserción masiva, selección de columnas, validaciones y simulador). | 👤 **Javier Infante** | 🟢 **Completado** |
| **Módulo 3** | **Consultas de Selección** (`SELECT`, alias `AS`, filtrado condicional con `WHERE`, operadores y búsqueda con `LIKE` `%` y `_`). | 👤 **Carlos Bernabe** | 🟡 **En desarrollo** |
| **Módulo 4** | **Modificación y Eliminación** (`UPDATE`, `DELETE` con `WHERE`, prevención de borrado accidental y comparativa con `TRUNCATE`). | 👤 **Deivy Prudente** | 🟡 **En desarrollo** |

---

## 🛠️ Tecnologías y Dependencias

Para garantizar máxima compatibilidad, rendimiento y que cualquier compañero pueda ejecutar el proyecto sin configuraciones complejas, la web está construida con tecnologías web estándar:

- **HTML5 Semántico**: Estructura accesible y optimizada para lectura técnica.
- **CSS3 Vanilla**: Sistema de diseño con variables CSS (`css/variables.css`), diseño responsivo y estética pastel.
- **JavaScript Moderno (ES6+)**: Funcionalidad de copiado automático de código con feedback visual, scroll spy dinámico y buscador en tiempo real.
- **Tipografías (Google Fonts)**: `Inter` (texto principal) y `JetBrains Mono` (código fuente).

> [!NOTE]
> **No se requiere compilar ni instalar frameworks pesados**. No necesitas configurar Webpack, Vite ni Tailwind para que funcione.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

Puedes visualizar y probar la página web en tu computadora utilizando cualquiera de estas opciones:

### Opción 1: Con la extensión Live Server de VS Code (Recomendada)
1. Abre la carpeta del proyecto en Visual Studio Code.
2. Si aún no la tienes, instala la extensión **Live Server** (de *Ritwick Dey*).
3. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"**.
4. Se abrirá automáticamente en tu navegador en `http://127.0.0.1:5500`.

### Opción 2: Con Node.js (`serve` o `live-server`)
Si tienes [Node.js](https://nodejs.org/) instalado en tu equipo:
```bash
# Ejecutar un servidor estático instantáneo sin instalar dependencias globales:
npx serve .
```
o también:
```bash
npx live-server .
```

### Opción 3: Con Python
Si tienes Python instalado:
```bash
# Python 3
python -m http.server 3000
```
Luego abre tu navegador en `http://localhost:3000`.

### Opción 4: Directo en el navegador (Sin servidor)
Haz doble clic sobre el archivo `index.html` para abrirlo directamente en Google Chrome, Edge o Firefox.

---

## 📂 Estructura del Repositorio

```text
ClasesDeBD/
├── index.html            # Archivo principal de la documentación
├── README.md             # Esta guía de trabajo y dependencias
├── plan_doc_db1.md       # Plan técnico de diseño y arquitectura
├── css/
│   ├── variables.css     # Paleta pastel, fuentes, bordes y espaciados
│   ├── base.css          # Resets, tipografía y scrollbars
│   ├── layout.css        # Disposición en 3 columnas (Sidebar, Main, TOC)
│   └── components.css    # Bloques de código, callouts, tablas y tarjetas
├── js/
│   └── app.js            # Buscador, botón de copiar código y scroll spy
└── assets/
    └── icons/            # Iconos y recursos gráficos
```

---

## 📝 Guía de Contribución para Integrantes (Javier, Carlos y Deivy)

Para que todos trabajemos de forma ordenada sin romper los estilos ni sobreescribir el trabajo de los demás, sigue estas pautas:

### 1. ¿Dónde escribir tu contenido?
En el archivo `index.html`, ubica tu sección asignada:
- **Javier Infante**: `<section id="modulo-2" class="doc-section">`
- **Carlos Bernabe**: `<section id="modulo-3" class="doc-section">`
- **Deivy Prudente**: `<section id="modulo-4" class="doc-section">`

### 2. Componentes UI reutilizables disponibles:

#### Bloques de Código con Botón de Copiar:
```html
<div class="code-block">
  <div class="code-header">
    <span class="code-lang">SQL &bull; Título de la consulta</span>
    <button class="copy-btn" title="Copiar código">Copiar</button>
  </div>
  <pre class="code-content"><code><span class="sql-kw">SELECT</span> * <span class="sql-kw">FROM</span> estudiantes;</code></pre>
</div>
```

#### Alertas y Callouts Pasteles:
- **Azul Pastel (Información / Concepto)**:
  ```html
  <div class="callout callout-info">
    <div class="callout-icon">💡</div>
    <div class="callout-body">
      <div class="callout-title">Concepto Clave</div>
      <p>Tu explicación aquí...</p>
    </div>
  </div>
  ```
- **Amarillo Pastel (Tip / Recomendación)**:
  ```html
  <div class="callout callout-tip">
    <div class="callout-icon">⭐</div>
    <div class="callout-body">
      <div class="callout-title">Buena Práctica</div>
      <p>Tu consejo aquí...</p>
    </div>
  </div>
  ```
- **Rojo Pastel (Peligro Crítico / Advertencia)**:
  ```html
  <div class="callout callout-danger">
    <div class="callout-icon">⚠️</div>
    <div class="callout-body">
      <div class="callout-title">¡Cuidado con esta operación!</div>
      <p>Explicación de seguridad...</p>
    </div>
  </div>
  ```

#### Tablas Técnicas:
Usa la clase `<table class="doc-table">` envuelta dentro de `<div class="table-wrapper">`.

---

## 🌿 Flujo Recomendado de Git

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Crea una rama con tu nombre o módulo antes de hacer cambios:
   ```bash
   git checkout -b modulo-2-javier
   ```
3. Realiza tus cambios y confirma tus commits:
   ```bash
   git add .
   git commit -m "feat(modulo-2): agregar sintaxis y ejemplos de INSERT INTO"
   ```
4. Sube tu rama a GitHub:
   ```bash
   git push origin modulo-2-javier
   ```
5. Abre un **Pull Request (PR)** para que el equipo revise y fusione en `main`.
