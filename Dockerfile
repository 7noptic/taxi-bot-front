FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
COPY ./ .
RUN npm run dev

FROM nginx as production-stage
RUN mkdir /app
HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD wget -nv -t1 --spider 'http://45.9.42.247:8000' || exit 0
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
