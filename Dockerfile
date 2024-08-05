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
