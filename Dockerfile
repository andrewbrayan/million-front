# Etapa 1: Build con Node
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencias
COPY package.json pnpm-lock.yaml ./
# Habilitar pnpm con corepack; si falla, instalar pnpm global
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate || npm i -g pnpm@9.12.3
RUN pnpm --version && pnpm install --frozen-lockfile

# Variables de entorno de build (Vite)
ARG VITE_API
ARG VITE_MAPBOX_ACCESS_TOKEN
ENV VITE_API=$VITE_API
ENV VITE_MAPBOX_ACCESS_TOKEN=$VITE_MAPBOX_ACCESS_TOKEN

# Código fuente
COPY . .

# Build de producción
RUN pnpm build

# Etapa 2: Nginx para servir SPA
FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


