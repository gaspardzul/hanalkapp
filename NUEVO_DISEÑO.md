# 🎨 Nuevo Diseño - Paleta Terracota y Tonos Tierra

## 🌈 Nueva Paleta de Colores

### Colores Principales

| Color | Hex | Uso | Variable Tailwind |
|-------|-----|-----|-------------------|
| **Terracota profundo** | `#C44A2E` | Botones principales, acentos | `terracota` |
| **Arena suave** | `#F3E9D2` | Fondo principal | `arena-200` |
| **Café oscuro** | `#4B2E05` | Texto y contraste | `cafe-700` |
| **Azul humo** | `#3E6D81` | Enlaces y detalles secundarios | `azul` |
| **Crema clara** | `#FFF8EE` | Fondos alternativos | `arena-100` |

### Escalas de Color

#### Terracota (Acento Principal)
```
50:  #FDF3F0  (muy claro)
100: #FAE7E1
200: #F5CFC3
300: #F0B7A5
400: #EA9F87
500: #C44A2E  ← Principal
600: #9D3B25
700: #762C1C
800: #4F1D12
900: #270F09  (muy oscuro)
```

#### Arena (Fondos)
```
50:  #FFFCF8
100: #FFF8EE  ← Crema clara
200: #F3E9D2  ← Arena suave (principal)
300: #E8D9B8
...
```

#### Café (Texto)
```
...
700: #4B2E05  ← Café oscuro (texto principal)
800: #321F03
900: #190F02
```

#### Azul (Secundario)
```
500: #3E6D81  ← Azul humo
600: #325767
...
```

---

## 🎯 Aplicación del Diseño

### 1. **Header (Navegación Superior)**
- **Fondo**: Café oscuro (`cafe-700`)
- **Texto**: Crema clara (`arena-100`)
- **Borde inferior**: Terracota 2px
- **Logo**: Gradiente terracota
- **Hover links**: Terracota claro (`terracota-300`)
- **Avatar**: Borde terracota

### 2. **Bottom Navigation (Tabs Móvil)**
- **Fondo**: Café oscuro (`cafe-700`)
- **Borde superior**: Terracota 2px
- **Iconos inactivos**: Arena claro (`arena-200`)
- **Iconos activos**: Terracota con fondo semi-transparente
- **Indicador activo**: Borde superior terracota

### 3. **Botones**
- **Primary**: Fondo terracota, texto crema, sombra
- **Secondary**: Fondo azul humo, texto crema, sombra
- **Outline**: Borde terracota, texto terracota
- **Ghost**: Texto terracota, hover fondo terracota claro

### 4. **Body (Fondo General)**
- **Fondo**: Crema clara (`arena-100`)
- **Texto**: Café oscuro (`cafe-700`)

---

## 🔄 Compatibilidad con Código Existente

Para mantener compatibilidad, los colores legacy apuntan a los nuevos:

```javascript
jade → terracota  (#C44A2E)
gold → terracota  (#C44A2E)
volcanic → cafe   (#4B2E05)
```

Esto significa que el código existente que usa `bg-jade` ahora mostrará terracota.

---

## 📝 Archivos Modificados

### 1. **`tailwind.config.js`**
- Nueva paleta completa de colores
- Escalas de 50-900 para cada color
- Colores legacy para compatibilidad

### 2. **`src/index.css`**
- Body con fondo `arena-100`
- Texto por defecto `cafe-700`

### 3. **`src/components/layout/Header.tsx`**
- Fondo café oscuro
- Texto crema
- Gradiente en logo
- Hover terracota
- Menú dropdown con nuevos colores

### 4. **`src/components/layout/BottomNav.tsx`**
- Fondo café oscuro
- Tabs con terracota
- Estados activos/inactivos con nuevos colores

### 5. **`src/components/common/Button.tsx`**
- Primary: Terracota
- Secondary: Azul humo
- Outline: Borde terracota
- Ghost: Texto terracota

---

## 🎨 Características del Nuevo Diseño

### Estilo Moderno y Sofisticado
- ✅ Paleta tierra cálida y acogedora
- ✅ Contraste elegante café/crema
- ✅ Acentos terracota vibrantes
- ✅ Toques azules para variedad

### Accesibilidad
- ✅ Alto contraste texto/fondo
- ✅ Colores distinguibles
- ✅ Estados claros (hover, active)

### Profesionalismo
- ✅ Paleta coherente
- ✅ Sombras sutiles
- ✅ Gradientes elegantes
- ✅ Bordes de acento

---

## 🚀 Próximos Pasos

Para completar el rediseño, considera actualizar:

1. **Cards de restaurantes**
   - Fondos arena/crema
   - Bordes terracota
   - Texto café

2. **Filtros y búsqueda**
   - Inputs con borde terracota
   - Focus terracota
   - Placeholders café claro

3. **Categorías**
   - Fondos con gradientes tierra
   - Hover terracota
   - Selección con borde terracota

4. **Mapas**
   - Marcadores terracota
   - Popups con nuevos colores

---

## 🎯 Comparación Antes vs Después

### Antes (Verde/Jade)
```
Header: Verde jade (#136F63)
Botones: Verde jade + Dorado (#F9A825)
Fondo: Blanco
Texto: Gris oscuro
```

### Después (Terracota/Tierra)
```
Header: Café oscuro (#4B2E05)
Botones: Terracota (#C44A2E) + Azul (#3E6D81)
Fondo: Crema (#FFF8EE)
Texto: Café oscuro (#4B2E05)
```

---

## 📊 Uso de Colores por Componente

| Componente | Fondo | Texto | Acento |
|------------|-------|-------|--------|
| Header | Café 700 | Arena 100 | Terracota |
| BottomNav | Café 700 | Arena 200 | Terracota |
| Body | Arena 100 | Café 700 | - |
| Button Primary | Terracota | Arena 100 | - |
| Button Secondary | Azul | Arena 100 | - |
| Button Outline | Transparente | Terracota | Borde terracota |
| Cards | Arena 50 | Café 700 | Terracota |

---

## ✅ Build Exitoso

El nuevo diseño ha sido compilado exitosamente:
- CSS: 37.89 kB (gzip: 11.10 kB)
- JS: 850.18 kB (gzip: 232.58 kB)

**Listo para deploy** 🚀

```bash
firebase deploy --only hosting
```

---

**Diseño moderno, elegante y profesional con tonos tierra** ✨
