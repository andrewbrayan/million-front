## Million Front (Prueba técnica)

**Nota importante:** La base de datos de ejemplo incluye propiedades en las ciudades de Bogotá, Miami, Los Ángeles, Chicago y New York. Puedes buscar por esas ciudades para validar el comportamiento del buscador y los mapas.

Este proyecto es una prueba técnica para la empresa Million. Es una SPA construida con React + TypeScript + Vite que consume un backend propio y usa Mapbox para mapas y geocodificación.

### Backend requerido
- Código del backend: `https://github.com/andrewbrayan/million-api`
- Levántalo localmente y coloca su URL en la variable `VITE_API` (ver Variables de entorno).

---

## Requisitos
- Node.js 18+ (recomendado 20+)
- pnpm (o usar Corepack)
- Cuenta de Mapbox para obtener un token (opcional si usas el token de ejemplo)

## Variables de entorno
Crea un archivo `.env` en la raíz (puedes copiar desde `.env-template`) y define:

```
VITE_API=http://localhost:5254
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiYW5kcmV3YnJheWFuIiwiYSI6ImNsNGVhdThhZDAxcHkzaHBnN3ZkdDJ0aGQifQ.4x_jvsBS14080T1qHi4K3w
```

- **VITE_API**: URL del backend (`million-api`). Levántalo siguiendo su README y colócala aquí.
- **VITE_MAPBOX_ACCESS_TOKEN**: token de Mapbox. Puedes usar el de ejemplo o generar uno gratis en `https://account.mapbox.com/access-tokens/`.

> El proyecto también incluye `.env-template` con el mismo formato.

---

## Ejecución en local
1. Instalar dependencias
   - Con pnpm: `pnpm install`
2. Levantar en desarrollo
   - `pnpm dev`
   - La app abrirá en `http://localhost:5173`
3. Compilar para producción
   - `pnpm build`
4. Previsualizar build
   - `pnpm preview` (sirve `dist/` en un servidor local)

---

## Despliegue con Docker
Este repositorio incluye un `Dockerfile` de producción (Nginx) y un `docker-compose.yml` opcional.

### 1) Build de imagen directamente con Docker

```bash
docker build \
  --build-arg VITE_API=http://localhost:5254 \
  --build-arg VITE_MAPBOX_ACCESS_TOKEN="pk.eyJ1IjoiYW5kcmV3YnJheWFuIiwiYSI6ImNsNGVhdThhZDAxcHkzaHBnN3ZkdDJ0aGQifQ.4x_jvsBS14080T1qHi4K3w" \
  -t million-front:latest .

docker run -p 8080:80 --name million-front --rm million-front:latest
```

```powershell
docker build `
  --build-arg VITE_API=http://localhost:5254 `
  --build-arg VITE_MAPBOX_ACCESS_TOKEN="pk.eyJ1IjoiYW5kcmV3YnJheWFuIiwiYSI6ImNsNGVhdThhZDAxcHkzaHBnN3ZkdDJ0aGQifQ.4x_jvsBS14080T1qHi4K3w" `
  -t million-front:latest .

docker run -p 8080:80 --name million-front --rm million-front:latest
```

La app quedará disponible en `http://localhost:8080`.

### 2) Usando docker-compose

1. Asegúrate de tener un `.env` con `VITE_API` y `VITE_MAPBOX_ACCESS_TOKEN`.
2. Ejecuta:

```
docker compose up --build
```

La app quedará en `http://localhost:8080`.

> Importante: `VITE_API` y `VITE_MAPBOX_ACCESS_TOKEN` se inyectan en tiempo de build (Vite). Si cambias estos valores, debes volver a construir la imagen.

---

## Tecnologías principales
- React 19 + TypeScript
- Vite 7
- Zustand para estado global
- TanStack Query para data fetching y caché
- Material UI (MUI) y Emotion
- Mapbox GL JS

---

## Estructura del proyecto (resumen)
```
src/
  core/
  shared/
  views/
  main.tsx
  router.tsx
```

---

## Notas
- El backend debe estar corriendo para que las búsquedas y listados funcionen.
- La base de datos de ejemplo contempla Bogotá, Miami, Los Ángeles, Chicago y New York para pruebas de búsqueda.
