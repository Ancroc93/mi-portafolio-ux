# Sanity.io CMS Integration

Este portafolio utiliza **Sanity.io** como headless CMS para gestionar el contenido de los proyectos.

## 🏗️ Arquitectura

```
┌─────────────────────────┐
│   Sanity Studio (CMS)   │  ← Editor de contenido
│  /sanity directory      │
└───────────┬─────────────┘
            │
            │ API GROQ
            ▼
┌─────────────────────────┐
│     Sanity CDN          │  ← Contenido + Imágenes
└───────────┬─────────────┘
            │
            │ Cliente
            ▼
┌─────────────────────────┐
│    React App (GitHub)   │  ← Tu portfolio
│  Componentes sin cambios│
└─────────────────────────┘
```

## 📦 Configuración Inicial

### 1. Instalar dependencias de Sanity Studio

```bash
cd sanity
npm install
```

### 2. Crear proyecto en Sanity.io

Visita [sanity.io/manage](https://sanity.io/manage) y crea un nuevo proyecto:
- **Project Name:** Mi Portafolio UX
- **Dataset:** production

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y actualiza con tus credenciales:

```bash
cp .env.example .env
```

Edita `.env`:
```
VITE_SANITY_PROJECT_ID=tu-project-id
VITE_SANITY_DATASET=production
```

### 4. Iniciar Sanity Studio localmente

```bash
cd sanity
npm run dev
```

Estará disponible en: `http://localhost:3333`

### 5. Deploy de Sanity Studio (Opcional)

```bash
cd sanity
npm run deploy
```

Tu Studio estará en: `https://tu-proyecto.sanity.studio`

---

## 📝 Uso del CMS

### Agregar un nuevo proyecto

1. Abre Sanity Studio
2. Click en "Project" → "New Project"
3. Rellena los campos:
   - **Title** (ES/EN)
   - **Slug** (auto-generado)
   - **Year, Role, Description**
   - **Main Image** (sube desde tu computadora)
   - **Tags** (ES/EN)

### Activar Case Study avanzado

1. Scroll hasta **Advanced Case Study**
2. Click "Add item"
3. Configura las secciones:
   - **Hero Image/Video:** Para el parallax hero
   - **Challenge & Solution:** Texto descriptivo
   - **Challenge Images:** Sube 2-3 imágenes
   - **Before/After Images:** Para el slider
   - **Gallery Images:** 5-7 imágenes finales
   - **Accent Color:** Color del proyecto
   - **Next Project:** Selecciona el siguiente proyecto

### Agregar Content Blocks

1. Scroll hasta **Content Blocks**
2. Click "Add item"
3. Selecciona tipo:
   - **Text:** Párrafos con título
   - **Image:** Imagen con alt text
   - **Video:** URL de YouTube/Vimeo
   - **List:** Lista de bullets

---

## 🖼️ Gestión de Multimedia

### Imágenes

**Recomendación:** Sube directamente a Sanity Studio
- Formato: JPG, PNG, WebP
- Peso máximo: 5MB (Sanity las optimiza automáticamente)
- Se generan automáticamente en WebP

### Videos

**Recomendación:** Usa URLs externas
1. Sube tu video a **YouTube** (unlisted) o **Cloudinary**
2. Copia la URL
3. Pega en el campo "Video URL" o "Hero Video URL"

---

## 🔄 Fetch de Datos en la App

El código ya está configurado para obtener datos de Sanity. Ver:
- `src/lib/sanity.ts` - Cliente configurado
- `src/lib/queries.ts` - Queries GROQ
- `src/data/projects.ts` - Fetch con fallback local

### Sistema de Fallback

Si Sanity no responde, la app usa automáticamente los datos locales de `projects.ts`.

---

## 🚀 Deploy

### GitHub Pages

La app ya está configurada para build estático. Sanity se consulta en build time.

### Sanity Studio

```bash
cd sanity
npm run deploy
```

---

## 📚 Recursos

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Reference](https://www.sanity.io/docs/groq)
- [Image URL Builder](https://www.sanity.io/docs/image-url)

---

## ⚠️ Notas Importantes

- **Los componentes React NO cambian.** Solo cambia de dónde viene la data.
- **Animaciones y layouts** siguen controlados en tu código.
- **Sanity Studio** es solo para editar contenido, no diseño.
- **Gratis hasta 5GB** de assets y 100k requests/mes.
