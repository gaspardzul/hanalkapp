# 🚀 Guía de Configuración Rápida - HanalKapp

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Google Places API

**IMPORTANTE:** La aplicación requiere una API Key de Google Places para funcionar.

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo
3. Habilita estas APIs:
   - **Places API (New)** ⭐ (Principal)
   - **Maps JavaScript API**
   - **Geocoding API**

4. Crea una API Key en "Credenciales"
5. Copia `.env.example` a `.env`:
```bash
cp .env.example .env
```

6. Edita `.env` y agrega tu API Key:
```env
VITE_GOOGLE_PLACES_API_KEY=TU_API_KEY_AQUI
```

### 3. Iniciar desarrollo
```bash
npm run dev
```

La app estará en `http://localhost:5173`

---

## 🔑 Restricciones de API Key (IMPORTANTE para Producción)

### Durante Desarrollo
- Puedes usar la key sin restricciones
- Google Places API tiene **límites de uso gratuito**

### Para Producción
1. En Google Cloud Console → API Key → Editar
2. Agregar restricciones de aplicación:
   - **Sitios web**: Agrega tus dominios permitidos
   - Ejemplo: `tudominio.com`, `*.tudominio.com`
3. Agregar restricciones de API:
   - Limita solo a las APIs que usas

---

## 💰 Costos de Google Places API

### Nivel Gratuito Mensual
- **$200 USD** en créditos gratuitos cada mes
- Esto equivale aproximadamente a:
  - ~17,000 búsquedas de texto (Text Search)
  - ~28,000 búsquedas cercanas (Nearby Search)
  - ~100,000 detalles básicos (Place Details Basic)

### Optimizaciones incluidas
- ✅ Cache de resultados en service worker
- ✅ Debouncing en búsquedas
- ✅ Lazy loading de imágenes
- ✅ Solo campos necesarios en Place Details

### Recomendaciones
1. Monitorea el uso en Google Cloud Console
2. Configura alertas de presupuesto
3. Usa el nivel gratuito para desarrollo
4. Para producción, evalúa el tráfico esperado

---

## 🔧 Variables de Entorno

### Requeridas
```env
VITE_GOOGLE_PLACES_API_KEY=your_key_here
```

### Opcionales (Firebase)
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Nota:** Firebase está preparado pero no implementado. Los favoritos funcionan con localStorage.

---

## 📱 Probar como PWA

### En Chrome/Edge (Escritorio)
1. Abre la app en desarrollo
2. Abre DevTools → Application → Manifest
3. Click en "Update on reload"
4. Recarga la página
5. Verás el botón de instalación en la barra de direcciones

### En Chrome Android
1. Abre la app en tu teléfono
2. Menú → "Agregar a pantalla de inicio"
3. La app se instalará como nativa

### En Safari iOS
1. Abre la app en Safari
2. Botón "Compartir"
3. "Agregar a pantalla de inicio"

---

## 🗺️ Funcionalidad del Mapa

### Leaflet vs Google Maps
Esta app usa **Leaflet** con tiles de OpenStreetMap porque:
- ✅ Gratuito y sin límites
- ✅ Ligero y rápido
- ✅ Excelente para PWAs
- ✅ No requiere API key adicional

Los datos de restaurantes vienen de Google Places API, pero los mapas son de OSM.

---

## 🔍 Tipos de Búsqueda Implementados

### 1. Text Search
```typescript
searchRestaurants(query, location?)
```
- Busca por nombre de restaurante, tipo de comida, platillo
- Opcionalmente usa ubicación para resultados cercanos

### 2. Nearby Search
```typescript
searchNearbyRestaurants(location, radius, type?)
```
- Busca restaurantes cercanos a una ubicación
- Radio en metros (default: 5km)
- Filtrable por tipo

### 3. Place Details
```typescript
getRestaurantDetails(placeId)
```
- Obtiene información completa del restaurante
- Incluye: horarios, reseñas, fotos, contacto

### 4. Búsqueda con Filtros
```typescript
searchWithFilters(filters)
```
- Combina búsqueda con múltiples filtros
- Rating, precio, horario, tipo de cocina

---

## 🎨 Paleta de Colores en Código

```typescript
// Tailwind Classes principales
bg-jade         // #136F63 - Color principal
bg-gold         // #F9A825 - Acentos
bg-sand         // #FAEBD7 - Fondos
bg-volcanic     // #4B3832 - Textos

// Variantes disponibles
jade-50 a jade-900
gold-50 a gold-900
sand-50 a sand-900
volcanic-50 a volcanic-900
```

---

## 📦 Build y Deploy

### Build de Producción
```bash
npm run build
```
Output: `dist/`

### Preview local del build
```bash
npm run preview
```

### Deploy en Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy en Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Variables de Entorno en Hosting
No olvides configurar `VITE_GOOGLE_PLACES_API_KEY` en:
- Vercel → Settings → Environment Variables
- Netlify → Site settings → Environment variables

---

## 🐛 Troubleshooting

### "Failed to fetch" en búsquedas
- ✅ Verifica que la API key esté en `.env`
- ✅ Revisa que las APIs estén habilitadas en Google Cloud
- ✅ Checa la consola del navegador para errores específicos
- ✅ Verifica límites de cuota en Google Cloud Console

### El mapa no se muestra
- ✅ Verifica que Leaflet CSS se esté importando
- ✅ Checa la consola por errores
- ✅ Asegúrate de que el contenedor tenga altura definida

### PWA no se instala
- ✅ Debe servirse por HTTPS (en producción)
- ✅ Verifica que `manifest.webmanifest` esté accesible
- ✅ Usa Chrome DevTools → Application → Manifest
- ✅ Checa que los iconos estén en `/public`

### TypeScript errors sobre `@/`
- ✅ Verifica `tsconfig.app.json` tiene paths configurados
- ✅ Reinicia el servidor de desarrollo
- ✅ Reinicia el TS server en VS Code

### Geolocalización no funciona
- ✅ Debe usarse HTTPS (excepto localhost)
- ✅ Usuario debe dar permisos
- ✅ Algunos navegadores bloquean en HTTP

---

## 📚 Recursos Adicionales

### Documentación
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Leaflet Docs](https://leafletjs.com/reference.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite PWA](https://vite-pwa-org.netlify.app/)

### Herramientas Útiles
- [PWA Builder](https://www.pwabuilder.com/) - Validar tu PWA
- [Lighthouse](https://developer.chrome.com/docs/lighthouse) - Auditar performance
- [Can I Use](https://caniuse.com/) - Compatibilidad de features

---

## 🤝 Siguientes Pasos

1. **Obtén tu API Key** y configura `.env`
2. **Prueba la app** con `npm run dev`
3. **Personaliza** colores y contenido según tu marca
4. **Implementa Firebase** para favoritos sincronizados (opcional)
5. **Deploy** a producción
6. **Configura restricciones** de API key
7. **Monitorea** el uso de la API

---

¡Listo! Tu app de descubrimiento de restaurantes está lista para usar. 🍽️
