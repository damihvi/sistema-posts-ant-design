# ⚠️ Limitaciones de la Colección de Postman

## Estado Actual del Proyecto

Este proyecto **Sistema de Posts** es actualmente **solo un frontend** desarrollado con:
- React 18
- TypeScript
- Vite
- Ant Design

## ¿Por qué fallan los requests de Postman?

### 🔴 No hay backend
- La aplicación React no incluye un servidor API
- Todos los datos son simulados en el contexto de React
- No hay rutas `/api/*` implementadas

### 🔴 El servidor Vite solo sirve archivos estáticos
- `http://localhost:5174` sirve la aplicación React
- No procesa peticiones POST, PUT, DELETE
- No tiene endpoints de API

## ✅ Lo que SÍ funciona

- **Frontend completo**: Navegación, formularios, estadísticas
- **Gestión de estado**: Crear, editar, eliminar posts (en memoria)
- **Interfaz responsive**: Funciona en móvil, tablet y desktop
- **Componentes de UI**: Todos los componentes Ant Design funcionan

## 🚀 Para hacer que Postman funcione

Necesitarías implementar un backend con:

### Option 1: Node.js + Express
```bash
npm install express cors
# Crear servidor en puerto 3000
# Implementar rutas /api/posts, /api/stats, etc.
```

### Option 2: Python + FastAPI
```bash
pip install fastapi uvicorn
# Crear servidor API
# Implementar endpoints según la colección
```

### Option 3: JSON Server (simulación rápida)
```bash
npm install -g json-server
# Crear db.json con datos
# Ejecutar: json-server --watch db.json --port 3000
```

## 📋 Estructura de datos esperada

El backend debería manejar posts con esta estructura:
```json
{
  "id": "string",
  "title": "string", 
  "content": "string",
  "author": "string",
  "status": "published|draft|archived",
  "tags": ["string"],
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

## 🎯 Propósito de la Colección

La colección de Postman está incluida para:
1. **Documentar** la API que debería existir
2. **Especificar** endpoints para futuros desarrolladores
3. **Mostrar** ejemplos de requests y responses
4. **Facilitar** la implementación del backend

## 💡 Recomendación

Si solo quieres ver la funcionalidad:
1. Abre `http://localhost:5174` en tu navegador
2. Usa la interfaz web para crear, editar y ver posts
3. Revisa las estadísticas en la página correspondiente

La aplicación funciona perfectamente como frontend, solo falta el backend para que Postman sea útil.
