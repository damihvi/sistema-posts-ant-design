# Colección de Postman - Sistema de Posts

Esta carpeta contiene la colección de Postman para probar la API del sistema de gestión de posts.

## Archivos incluidos

### 1. Posts-API-Collection.json
Colección completa con todos los endpoints del sistema:
- **GET /api/posts** - Obtener todos los posts con filtros opcionales
- **GET /api/posts/:id** - Obtener un post específico
- **POST /api/posts** - Crear un nuevo post
- **PUT /api/posts/:id** - Actualizar un post existente
- **DELETE /api/posts/:id** - Eliminar un post
- **GET /api/stats** - Obtener estadísticas del sistema

### 2. Posts-Environment.json
Variables de entorno para diferentes ambientes:
- `baseUrl`: URL base del servidor (http://localhost:3000)
- `apiVersion`: Versión de la API (v1)
- `authToken`: Token de autenticación (opcional)
- `testUserId`: ID de usuario para testing
- `testAuthor`: Autor de prueba

## Cómo usar

### 1. Importar en Postman
1. Abre Postman
2. Haz clic en "Import" 
3. Arrastra o selecciona el archivo `Posts-API-Collection.json`
4. Repite el proceso para `Posts-Environment.json`

### 2. Configurar el entorno
1. En Postman, selecciona el entorno "Posts System Environment"
2. Verifica que `baseUrl` apunte a tu servidor local
3. Ajusta las variables según tu configuración

### 3. Ejecutar las pruebas
1. Selecciona la colección "Sistema de Posts API"
2. Ejecuta los requests individualmente o toda la colección
3. Verifica las respuestas y códigos de estado

## Estructura de datos

### Post Object
```json
{
  "id": "string",
  "title": "string",
  "content": "string", 
  "author": "string",
  "status": "published|draft|archived",
  "tags": ["string"],
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### Stats Object
```json
{
  "total": 0,
  "published": 0,
  "drafts": 0,
  "archived": 0,
  "averageLength": 0,
  "mostPopularTags": [
    {"tag": "string", "count": 0}
  ]
}
```

## Notas importantes

- **Desarrollo**: Actualmente la aplicación usa datos simulados en el frontend
- **API Real**: Para usar con una API real, actualiza `baseUrl` en el entorno
- **Autenticación**: Los endpoints están preparados para autenticación futura
- **Validación**: Todos los campos requeridos están documentados en cada request

## Ejemplos de uso

### Crear un post
```json
POST /api/posts
{
  "title": "Mi primer post",
  "content": "Contenido del post...",
  "author": "Usuario Test",
  "status": "published",
  "tags": ["ejemplo", "test"]
}
```

### Filtrar posts
```
GET /api/posts?status=published&author=Admin&limit=5
```

---

**Tip**: Usa el Runner de Postman para ejecutar toda la colección y generar reportes de testing automatizado.
