# ⚠️ NOTAS IMPORTANTES - Lee Primero

## 🚨 Cambios Críticos Aplicados

### Google Places API - Cambio de Implementación

**❌ NO FUNCIONA:** Llamadas directas con `fetch()` a la REST API
**✅ FUNCIONA:** Google Maps JavaScript API con `PlacesService`

**Por qué el cambio:**
- La REST API de Google Places tiene restricciones CORS
- Las llamadas desde el navegador son bloqueadas
- Google recomienda usar su JavaScript API para web

**Lo que esto significa:**
1. ✅ No necesitas un backend/proxy
2. ✅ Todo funciona del lado del cliente
3. ✅ Mismos costos que la REST API
4. ✅ Sin problemas de CORS

---

## 📋 Checklist Antes de Usar

### Paso 1: Google Cloud Console

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Crea un proyecto (o usa uno existente)
3. **Habilita estas 2 APIs:**
   - ✅ **Maps JavaScript API** (IMPORTANTE)
   - ✅ **Places API**
4. Crea una API Key en "Credenciales"
5. Copia la key

### Paso 2: Configurar la App

```bash
# 1. Copiar archivo de ejemplo
cp .env.example .env

# 2. Editar .env
nano .env  # o tu editor preferido

# 3. Pegar tu API Key
VITE_GOOGLE_PLACES_API_KEY=AIzaSy...tu_key_aqui
```

### Paso 3: Instalar y Ejecutar

```bash
# Instalar
npm install

# Ejecutar
npm run dev
```

---

## ✅ ¿Cómo Saber que Funciona?

### En la Consola del Navegador (F12)

**❌ Errores que YA NO deberías ver:**
```
Access to fetch... blocked by CORS policy
Service worker registration failed
Failed to load resource: net::ERR_FAILED
```

**✅ Lo que deberías ver:**
```
[Ningún error relacionado con Google Maps]
Restaurantes cargando correctamente
Fotos mostrándose
```

### Prueba Rápida

1. Abre `http://localhost:5173`
2. Click en "📍 Restaurantes cercanos"
3. Permite geolocalización
4. **Deberías ver:** Lista de restaurantes con fotos
5. **NO deberías ver:** Errores CORS

---

## 🔑 APIs Requeridas en Google Cloud

### Maps JavaScript API ⭐ (CRÍTICO)

**Por qué:** Esta es la que permite usar `google.maps.places.PlacesService`

**Cómo habilitar:**
1. Google Cloud Console
2. "APIs y Servicios" → "Biblioteca"
3. Buscar "Maps JavaScript API"
4. Click "Habilitar"

### Places API ⭐ (CRÍTICO)

**Por qué:** Proporciona los datos de restaurantes

**Cómo habilitar:**
1. Mismo menú, buscar "Places API"
2. Click "Habilitar"

### ✅ Verificar que Estén Habilitadas

1. Google Cloud Console
2. "APIs y Servicios" → "Panel"
3. Deberías ver ambas APIs listadas

---

## 💰 Costos y Límites

### Nivel Gratuito

- **$200 USD** en créditos gratis cada mes
- Esto equivale aproximadamente a:
  - ~17,000 búsquedas de texto
  - ~28,000 búsquedas cercanas
  - ~100,000 detalles de lugares

### Monitoreo

1. Google Cloud Console → "Facturación"
2. Configura alertas de presupuesto
3. Monitorea el uso en "APIs y Servicios" → "Panel"

---

## 🐛 Troubleshooting

### Error: "Google is not defined"

**Causa:** La API Key no está configurada o las APIs no están habilitadas

**Solución:**
1. Verifica `.env` tiene la key correcta
2. Verifica que Maps JavaScript API esté habilitada
3. Recarga la página (Ctrl+R o Cmd+R)

### Error: "This API project is not authorized..."

**Causa:** La API key tiene restricciones que bloquean localhost

**Solución:**
1. Google Cloud Console → Credenciales
2. Edita tu API Key
3. En "Restricciones de aplicación":
   - Selecciona "Ninguna" (para desarrollo)
   - O agrega `localhost:5173` a los sitios permitidos

### No Se Ven Restaurantes

**Posibles causas:**
1. No diste permiso de geolocalización
2. La API key no tiene permisos
3. No hay restaurantes cerca (poco probable)

**Solución:**
- Abre DevTools (F12)
- Ve a Consola
- Busca mensajes de error
- Sigue las instrucciones del error

### Fotos No Se Cargan

**Causa:** Normal, Google Places a veces no tiene fotos

**Solución:** Verás un placeholder gris

---

## 📱 Probar como PWA

### En Desarrollo (localhost)

El service worker NO se registra en desarrollo para evitar problemas.

### Para Probar PWA:

```bash
# 1. Build de producción
npm run build

# 2. Preview del build
npm run preview

# 3. Abre en navegador
# Ahora verás el botón de "Instalar"
```

---

## 🎯 Características Funcionando

- ✅ Búsqueda de restaurantes
- ✅ Filtros por tipo de cocina
- ✅ Geolocalización
- ✅ Mapas interactivos
- ✅ Vista de detalles
- ✅ Fotos de restaurantes
- ✅ Reseñas
- ✅ Favoritos (localStorage)
- ✅ PWA instalable (en producción)

---

## 📚 Documentación de Referencia

- `README.md` - Documentación completa
- `SETUP.md` - Guía de configuración
- `FIXES.md` - Problemas resueltos
- `QUICKSTART.md` - Inicio rápido

---

## 🚀 Deploy a Producción

### Antes de Deploy

1. ✅ Generar iconos PWA reales
2. ✅ Configurar restricciones de API Key
3. ✅ Probar en dispositivos móviles
4. ✅ Revisar costos de Google Places

### Restricciones de API Key para Producción

**IMPORTANTE:** En producción, restringe tu API Key:

1. Google Cloud Console → Credenciales
2. Edita tu API Key
3. **Restricciones de aplicación:**
   - Sitios web
   - Agrega tu dominio: `tuapp.com`, `*.tuapp.com`
4. **Restricciones de API:**
   - Solo: Maps JavaScript API, Places API

**Esto previene:**
- Uso no autorizado
- Cargos inesperados
- Robo de API key

---

## ✅ Todo Listo

Si seguiste estos pasos:
- ✅ API Key configurada
- ✅ APIs habilitadas en Google Cloud
- ✅ `npm install` ejecutado
- ✅ `npm run dev` corriendo

**Deberías poder:**
- Buscar restaurantes
- Ver fotos y detalles
- Usar el mapa
- Filtrar por categorías

---

🍽️ **¡Disfruta HanalKapp!**

*Si tienes problemas, revisa `FIXES.md` o abre un issue en GitHub*
