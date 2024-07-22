FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build # Замена npm run dev на npm run build
# COPY ./ . - Не нужно копировать исходный код в папку dist

FROM nginx as production-stage
COPY --from=build-stage /app/dist /app # Копирование папки dist
COPY nginx.conf /etc/nginx/nginx.conf
# RUN surge /app/dist/spa - Удалить
# Изменить HEALTHCHECK на проверки Coolify порта
HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD wget -nv -t1 --spider 'http://localhost:8085/' || exit 0
