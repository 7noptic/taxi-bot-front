FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
COPY . .

USER node
RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN npm install -g surge && \
    npm cache clean --force

USER root
RUN npm install
ENV NODE_ENV production
ENV QUASAR_MODE production
RUN npm run build
CMD ["surge", "dist/spa", "taxi-bot-admin.ru"]

