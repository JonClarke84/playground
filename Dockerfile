# Build the Vite SPA, serve it as static files with nginx.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
# Hash routing means no SPA fallback is needed; the PWA service worker and
# hashed assets are served as plain static files.
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
