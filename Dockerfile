FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install -g surge
RUN npm install
ENV NODE_ENV production
ENV QUASAR_MODE production
RUN npm run build
RUN surge dist/spa

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD wget -nv -t1 --spider 'http://localhost:8080/' || exit 0
