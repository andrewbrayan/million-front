# Etapa 1: Build con Node
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencias
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate
RUN pnpm install --frozen-lockfile

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

# Config Nginx para SPA (React Router fallback)
RUN <<'EOF' cat > /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;

  root   /usr/share/nginx/html;
  index  index.html;

  location / {
    try_files $uri /index.html;
  }

  # Assets con cache
  location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
    try_files $uri =404;
    expires 30d;
    access_log off;
  }
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


