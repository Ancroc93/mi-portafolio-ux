# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 🚀 Cómo retomar este proyecto en otro computador

Si quieres descargar este proyecto en un nuevo computador (Windows/Mac) para seguir trabajando, sigue estos pasos:

### 1. Prerrequisitos
Necesitas tener instalado:
- **Node.js** (Versión 18 o superior): [Descargar aquí](https://nodejs.org/).
- **Git**: [Descargar aquí](https://git-scm.com/downloads).
- **Cursor** (Editor de código): [Descargar aquí](https://cursor.sh/).

### 2. Descargar el código (Clonar)
1. Abre **Cursor**.
2. Abre la terminal (`Ctrl + J` o `Cmd + J`).
3. Escribe este comando y presiona Enter:
   ```bash
   git clone https://github.com/Ancroc93/mi-portafolio-ux.git
   ```
4. Entra a la carpeta del proyecto:
   ```bash
   cd mi-portafolio-ux
   ```

### 3. Instalar dependencias
Para instalar las "piezas" que hacen funcionar el sitio, corre este comando:
```bash
npm install
```

### 4. Iniciar el sitio
Para ver tu portafolio en tu navegador:
```bash
npm run dev
```
Haz clic en el link que aparece (usualmente `http://localhost:5173/`).

---

## 🌐 Idiomas

El sitio soporta español e inglés. Puedes alternar el idioma desde el selector en la barra de navegación y la preferencia queda guardada en `localStorage`.

---

## 🛠 Comandos Útiles

- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`git pull`**: Descarga los últimos cambios si editaste desde otro lado.
- **`git add .`**, **`git commit -m "mensaje"`**, **`git push`**: Para guardar tus cambios en la nube.
