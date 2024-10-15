# Стадия сборки
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
ENV NODE_ENV production
ENV QUASAR_MODE production
RUN npm run build

# Стадия запуска
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /var/www/html/
COPY nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
 CMD wget -nv -t1 --spider 'http://localhost' || exit 0
