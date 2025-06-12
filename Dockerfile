FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]

FROM node:18-alpine AS production

