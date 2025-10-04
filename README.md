# 🍽️ HanalKapp - Descubre los Mejores Restaurantes

HanalKapp es una **Progressive Web App (PWA)** de descubrimiento de restaurantes estilo Yelp, enfocada en ofrecer una experiencia móvil excepcional para encontrar los mejores lugares de comida cerca de ti.

![HanalKapp Banner](https://via.placeholder.com/1200x400/136F63/FFFFFF?text=HanalKapp+-+Descubre+Restaurantes)

## ✨ Características Principales

### 🔍 Búsqueda Avanzada
- Búsqueda por texto (nombre, tipo de comida, platillo)
- Búsqueda por ubicación con geolocalización
- Filtros por:
  - Tipo de cocina (12 categorías)
  - Calificación mínima
  - Rango de precio ($ a $$$)
  - Estado: abierto ahora
  - Servicios: delivery, para llevar, reservaciones

### 🗺️ Vista Dual
- **Vista Lista**: Cards con información detallada de cada restaurante
- **Vista Mapa**: Mapa interactivo con Leaflet mostrando ubicaciones

### 📱 Página de Detalle Completa
- Galería de fotos con slider
- Información completa de contacto
- Horarios de apertura
- Mapa de ubicación
- Reseñas de usuarios con calificaciones
- Botones de acción rápida (llamar, cómo llegar, sitio web)
- Funcionalidad de compartir (Web Share API)

### 🌮 Categorías Gastronómicas
- Cocina Mexicana
- Italiana
- Hamburguesas y Fast Food
- Asiática
- Internacional
- Cafeterías y Postres
- Carnes y Parrillas
- Mariscos
- Saludable
- Bares y Cantinas
- Comida Rápida Regional
- Cocina Regional Mexicana

### ❤️ Sistema de Favoritos
- Guarda tus restaurantes favoritos
- Acceso rápido desde la navegación
- Persistencia local (preparado para Firebase)

### 📱 PWA Capabilities
- Instalable en home screen
- Funciona offline con service workers
- Optimizado para móvil
- Splash screen personalizado
- Estrategias de cache inteligentes

## 🎨 Paleta de Colores

HanalKapp utiliza una paleta inspirada en la cultura maya:

- **Jade profundo**: `#136F63` - Color principal, identidad maya
- **Dorado solar**: `#F9A825` - Acentos, CTAs, elementos destacados
- **Arena clara**: `#FAEBD7` - Fondos suaves, cards
- **Gris volcánico**: `#4B3832` - Textos, modo oscuro (futuro)

## 🚀 Tecnologías Utilizadas

### Core
- **React 18+** con TypeScript
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos utility-first
- **React Router** - Navegación SPA

### APIs y Servicios
- **Google Places API (New)** - Búsqueda de restaurantes
- **Leaflet** - Mapas interactivos
- **Firebase** - Preparado para autenticación y favoritos

### PWA
- **Vite PWA Plugin** - Configuración PWA
- **Workbox** - Service workers y caching

### Herramientas
- **TypeScript** - Type safety
- **ESLint** - Linting
- **clsx** - Utility para clases CSS

## 📦 Instalación

### Prerrequisitos

- Node.js 20.19.0 o superior
- npm 10.2.4 o superior
- API Key de Google Places

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/gaspardzul/hanalkapp.git
cd hanalkapp
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia el archivo de ejemplo y configura tus API keys:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# Google Places API Key
VITE_GOOGLE_PLACES_API_KEY=tu_api_key_aqui

# Firebase (opcional, para favoritos)
VITE_FIREBASE_API_KEY=tu_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=tu_app_id
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔑 Obtener API Keys

### Google Places API

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita las siguientes APIs:
   - Places API (New)
   - Maps JavaScript API
   - Geocoding API
4. Ve a "Credenciales" y crea una API Key
5. Restringe la key a tus dominios (producción)
6. Copia la key a tu archivo `.env`

**APIs de Google Places utilizadas:**
- Text Search
- Nearby Search
- Place Details
- Place Photos

### Firebase (Opcional)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Registra tu aplicación web
4. Copia las credenciales al archivo `.env`

## 🏗️ Estructura del Proyecto

```
hanalkapp/
├── public/                      # Assets públicos y PWA
│   ├── manifest.webmanifest     # Configuración PWA
│   ├── robots.txt               # SEO
│   └── *.png                    # Iconos PWA
├── src/
│   ├── components/              # Componentes React
│   │   ├── common/              # Componentes reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── StarRating.tsx
│   │   ├── layout/              # Layout principal
│   │   │   ├── Header.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── Layout.tsx
│   │   ├── restaurants/         # Componentes de restaurantes
│   │   │   ├── RestaurantCard.tsx
│   │   │   └── RestaurantList.tsx
│   │   ├── map/                 # Componentes de mapa
│   │   │   └── MapView.tsx
│   │   └── search/              # Componentes de búsqueda
│   │       ├── SearchBar.tsx
│   │       ├── FilterPanel.tsx
│   │       └── CuisineFilter.tsx
│   ├── pages/                   # Páginas de la aplicación
│   │   ├── Home.tsx             # Página principal
│   │   ├── SearchResults.tsx    # Resultados de búsqueda
│   │   ├── RestaurantDetail.tsx # Detalle de restaurante
│   │   ├── Categories.tsx       # Categorías de cocina
│   │   └── Favorites.tsx        # Favoritos del usuario
│   ├── services/                # Servicios externos
│   │   ├── googlePlaces.ts      # Integración Google Places
│   │   └── firebase.ts          # Configuración Firebase
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useGeolocation.ts    # Hook de geolocalización
│   │   ├── useRestaurants.ts    # Hook de búsqueda
│   │   └── useFavorites.ts      # Hook de favoritos
│   ├── types/                   # Tipos TypeScript
│   │   └── restaurant.ts        # Tipos de restaurantes
│   ├── utils/                   # Utilidades
│   │   ├── constants.ts         # Constantes globales
│   │   ├── formatters.ts        # Funciones de formato
│   │   └── cuisineTypes.ts      # Definición de categorías
│   ├── App.tsx                  # Componente raíz
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globales
├── .env.example                 # Ejemplo de variables de entorno
├── package.json                 # Dependencias
├── tsconfig.json                # Configuración TypeScript
├── vite.config.ts               # Configuración Vite
├── tailwind.config.js           # Configuración Tailwind
└── README.md                    # Este archivo
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Preview del build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🌐 Despliegue

### Build de Producción

```bash
npm run build
```

Esto generará los archivos optimizados en la carpeta `dist/`

### Opciones de Hosting

**Recomendado para PWA:**
- **Vercel** - Despliegue automático desde GitHub
- **Netlify** - Excelente soporte para PWAs
- **Firebase Hosting** - Integración natural con Firebase

**Ejemplo con Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Ejemplo con Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🔐 Seguridad

- Las API keys NUNCA deben estar en el código
- Usa variables de entorno para todas las credenciales
- En producción, restringe las API keys a tus dominios
- Firebase Security Rules pendientes de implementar

## 📱 PWA - Instalación

1. Abre la app en un navegador compatible
2. Busca el botón "Instalar" o "Agregar a pantalla de inicio"
3. La app se instalará como una aplicación nativa

**Navegadores soportados:**
- Chrome/Edge (Android, Desktop)
- Safari (iOS, macOS)
- Firefox (Android, Desktop)

## 🚧 Funcionalidades Pendientes (TODOs)

### Implementación Firebase Completa
```typescript
// TODO: Implementar autenticación
// TODO: Implementar sincronización de favoritos
// TODO: Agregar Firebase Security Rules
```

### Mejoras Futuras
- [ ] Modo oscuro
- [ ] Búsqueda por voz
- [ ] Compartir listas de favoritos
- [ ] Sistema de reviews propio
- [ ] Notificaciones push
- [ ] Soporte offline completo
- [ ] Imágenes optimizadas con CDN
- [ ] Testing con Vitest
- [ ] Storybook para componentes

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Gaspar Dzul**
- GitHub: [@gaspardzul](https://github.com/gaspardzul)

## 🙏 Agradecimientos

- Google Places API por los datos de restaurantes
- Leaflet por los mapas
- Tailwind CSS por el sistema de diseño
- La comunidad de React y TypeScript

---

**HanalKapp** - Descubre los mejores sabores cerca de ti 🍽️❤️

*"Hanal" significa "comida" en maya yucateco*
