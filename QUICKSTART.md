# ⚡ Quick Start - HanalKapp

## 🚀 En 3 Pasos (5 minutos)

### 1️⃣ Instalar
```bash
npm install
```

### 2️⃣ Configurar API Key
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y agregar tu Google Places API Key
# VITE_GOOGLE_PLACES_API_KEY=tu_api_key_aqui
```

**¿No tienes API Key?** → [Consíguela aquí](https://console.cloud.google.com/)

### 3️⃣ Ejecutar
```bash
npm run dev
```

Abre `http://localhost:5173` 🎉

---

## 📚 Documentación

- **README.md** - Documentación completa del proyecto
- **SETUP.md** - Guía detallada de configuración
- **PROJECT_SUMMARY.md** - Resumen ejecutivo

---

## 🔑 Obtener Google Places API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto
3. Habilita "Places API (New)"
4. Crea credenciales → API Key
5. Cópiala a `.env`

**Gratis:** $200 USD de créditos mensuales

---

## 🛠️ Comandos Útiles

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Preview del build
npm run lint     # Linting
```

---

## ✅ Checklist

- [ ] Instalar dependencias (`npm install`)
- [ ] Obtener API Key de Google Places
- [ ] Configurar `.env` con la API Key
- [ ] Ejecutar `npm run dev`
- [ ] Abrir http://localhost:5173
- [ ] ¡Buscar restaurantes! 🍽️

---

## 🆘 ¿Problemas?

### "Failed to fetch"
→ Verifica que la API Key esté en `.env`

### "Cannot find module '@/...'"
→ Reinicia el servidor de desarrollo

### El mapa no aparece
→ Limpia el cache y recarga

---

## 📱 Probar como PWA

**Chrome/Edge:**
1. Click en el icono de instalación en la barra
2. "Instalar HanalKapp"

**Safari iOS:**
1. Compartir → Agregar a pantalla de inicio

---

**¡Listo! Ya puedes descubrir restaurantes** 🍽️❤️

Más info en `README.md`
