# 🔍 Instrucciones de Depuración - Búsqueda por Categorías

## 🎯 Problema Actual

El `query` llega como `undefined` a `searchWithFilters`, causando que todas las categorías devuelvan los mismos resultados (búsqueda nearby sin filtro).

## 📊 Logs Actuales (Incorrectos)

```
🔍 searchWithFilters called with: {query: undefined, cuisine: 'healthy', location: {…}}
📍 Using nearby search (no query)
✅ Search completed: {totalResults: 20, filteredResults: 20, query: undefined}
```

**Problema:** `query: undefined` → Usa búsqueda nearby genérica

## ✅ Logs Esperados (Correctos)

### Desde Categories.tsx:
```
🍽️ Category clicked: { cuisineId: "healthy", searchTerm: "healthy restaurant" }
📍 Navigating to: /search?q=healthy+restaurant&cuisine=healthy&lat=...&lng=...
🔄 SearchResults useEffect triggered: {
  queryParam: "healthy restaurant",
  query: "healthy restaurant",
  cuisine: "healthy",
  allParams: { q: "healthy restaurant", cuisine: "healthy", lat: "...", lng: "..." }
}
🚀 Triggering search with filters: { query: "healthy restaurant", location: {...}, cuisine: "healthy" }
🔍 searchWithFilters called with: { query: "healthy restaurant", cuisine: "healthy", location: {...} }
🔎 Using text search with query: healthy restaurant
✅ Search completed: { totalResults: 15, filteredResults: 15, query: "healthy restaurant" }
```

### Desde Home.tsx:
```
🏠 Home - Category clicked: { cuisineId: "mexican", searchTerm: "mexican restaurant" }
🏠 Home - Navigating to: /search?q=mexican+restaurant&cuisine=mexican&lat=...&lng=...
🔄 SearchResults useEffect triggered: {
  queryParam: "mexican restaurant",
  query: "mexican restaurant",
  cuisine: "mexican",
  allParams: { q: "mexican restaurant", cuisine: "mexican", lat: "...", lng: "..." }
}
...
```

## 🧪 Pasos para Probar

### 1. Limpia la Consola
- Abre DevTools (F12)
- Ve a la pestaña Console
- Haz clic en el ícono 🚫 para limpiar la consola

### 2. Recarga la Aplicación
- Presiona `Ctrl/Cmd + Shift + R` (hard reload)
- Esto limpia el caché y recarga completamente

### 3. Prueba desde Categories
1. **Ve a la página de Categorías** (`/categories`)
2. **Haz clic en una categoría** (ej: "Saludable")
3. **Copia TODOS los logs** de la consola
4. **Comparte los logs**

### 4. Prueba desde Home
1. **Ve a la página de inicio** (`/`)
2. **Haz clic en una categoría** del carrusel
3. **Copia TODOS los logs** de la consola
4. **Comparte los logs**

## 🔎 Qué Buscar en los Logs

### ✅ Señales de que está funcionando:
- `queryParam: "mexican restaurant"` (NO `"null"` o `""`)
- `query: "mexican restaurant"` (NO `undefined`)
- `🔎 Using text search with query: mexican restaurant` (NO "Using nearby search")
- Diferentes `totalResults` para diferentes categorías

### ❌ Señales de problema:
- `queryParam: "null"` o `queryParam: ""`
- `query: undefined`
- `📍 Using nearby search (no query)` cuando haces clic en una categoría
- Mismo `totalResults` para todas las categorías

## 🐛 Posibles Causas del Problema

### 1. Navegación directa a /search
**Síntoma:** No ves los logs `🍽️ Category clicked:` o `🏠 Home - Category clicked:`

**Causa:** Estás escribiendo `/search` directamente en la barra de direcciones o usando un bookmark.

**Solución:** Navega haciendo clic en las categorías desde la UI.

### 2. Caché del navegador
**Síntoma:** Los cambios no se reflejan después de recargar.

**Solución:**
```bash
# En terminal
rm -rf node_modules/.vite
npm run dev
```

Luego en el navegador: `Ctrl/Cmd + Shift + R`

### 3. Múltiples instancias del servidor
**Síntoma:** Los cambios en el código no se reflejan.

**Solución:**
```bash
# Mata todos los procesos en el puerto 5173
lsof -ti:5173 | xargs kill -9

# Inicia el servidor nuevamente
npm run dev
```

### 4. React Router no actualiza searchParams
**Síntoma:** `allParams` está vacío o no contiene `q`.

**Solución:** Verifica que estás usando `react-router-dom` v7+ correctamente.

## 📝 Información a Compartir

Si el problema persiste, comparte:

1. **Logs completos de la consola** (desde que haces clic hasta que aparecen los resultados)
2. **URL completa** que aparece en la barra de direcciones después de hacer clic
3. **Desde dónde hiciste clic** (Home, Categories, o URL directa)
4. **Versión de React Router:** (ya está en package.json: `^7.1.3`)

## 🎯 Próximos Pasos

1. **Sigue los pasos de prueba** arriba
2. **Copia los logs completos**
3. **Comparte los logs** para que pueda diagnosticar el problema exacto
4. **Indica si ves** los logs de "Category clicked" o no

---

**Nota:** Los logs son CRUCIALES para diagnosticar. Sin ellos, no puedo saber exactamente dónde está fallando el flujo.
