#!/bin/bash
# Este script crea iconos placeholder SVG simples
# Para producción, reemplaza estos con iconos reales

# 192x192
cat > pwa-192x192.png.svg << 'SVGEOF'
<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
  <rect width="192" height="192" fill="#136F63"/>
  <text x="96" y="130" font-size="80" text-anchor="middle" fill="white">🍽️</text>
</svg>
SVGEOF

# 512x512
cat > pwa-512x512.png.svg << 'SVGEOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#136F63"/>
  <text x="256" y="350" font-size="200" text-anchor="middle" fill="white">🍽️</text>
</svg>
SVGEOF

echo "Placeholder SVG icons created. Convert to PNG for production."
