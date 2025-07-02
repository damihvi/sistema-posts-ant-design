# 📝 Sistema de Gestión de Posts

Un sistema completo de gestión de posts desarrollado con **React**, **TypeScript**, **Vite** y **Ant Design**, replicando exactamente la funcionalidad de la página [francisco-higuera.netlify.app/reactjs/test2-reactjs](https://francisco-higuera.netlify.app/reactjs/test2-reactjs).

## ✨ Características

### 🏠 Dashboard Principal
- **Bienvenida al Módulo de Posts** con imagen de banner
- Navegación rápida a todas las funcionalidades
- Diseño moderno y responsivo

### 📄 Gestión de Posts
- **Ver Publicaciones**: Lista completa de posts con filtros
- **Crear Nuevo Post**: Formulario completo con validaciones
- **Editar Posts**: Modificación de posts existentes
- **Eliminar Posts**: Confirmación de eliminación
- Estados: Borrador, Publicado, Archivado
- Sistema de tags para organización

### 📊 Estadísticas
- Resumen general de posts
- Distribución por estado (gráficos)
- Tags más populares
- Métricas de productividad
- Recomendaciones automáticas

## 🚀 Tecnologías Utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Ant Design** - Librería de componentes UI
- **React Router** - Navegación SPA
- **Day.js** - Manipulación de fechas
- **Context API** - Gestión de estado global

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📡 API Collection (Postman)

Se incluye una **colección completa de Postman** en la carpeta `postman/` con:

### 📁 Archivos incluidos:
- `Posts-API-Collection.json` - Colección principal
- `Posts-Environment.json` - Variables de entorno

### 🔌 Endpoints disponibles:

#### **Posts CRUD**
- `GET /api/posts` - Obtener todos los posts
- `GET /api/posts/:id` - Obtener post por ID  
- `POST /api/posts` - Crear nuevo post
- `PUT /api/posts/:id` - Actualizar post
- `DELETE /api/posts/:id` - Eliminar post

#### **Estadísticas**
- `GET /api/stats` - Estadísticas generales
- `GET /api/stats/authors` - Estadísticas por autor
- `GET /api/stats/period` - Estadísticas por período

#### **Búsqueda**
- `GET /api/posts/search` - Buscar posts
- `GET /api/tags` - Obtener todos los tags

### 📥 Importar en Postman:

1. Abrir Postman
2. Click en "Import"
3. Seleccionar los archivos de la carpeta `postman/`
4. Configurar el entorno con `baseUrl: http://localhost:3000`

## 🎯 Funcionalidades Implementadas

### ✅ Replicación Exacta de la Página Original

- **Banner de bienvenida** con imagen de picsum.photos
- **Tres secciones principales**:
  - Ver Publicaciones 📄
  - Crear Nuevo Post ➕  
  - Estadísticas 📊
- **Footer** con copyright 2025
- **Nota importante**: "Recuerda: Cada post debe tener título y contenido"

### ✅ Características Adicionales

- **Gestión completa de estado** con Context API
- **Validaciones de formulario** robustas
- **Sistema de tags** dinámico
- **Filtros y búsqueda** avanzados
- **Modo responsive** para móviles
- **Animaciones y transiciones** suaves

---

⭐ **Sistema de Posts - Taller Académico 2025** ⭐
