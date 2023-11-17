FROM node:18-alpine AS build

WORKDIR /app
COPY package.json .
COPY . .

RUN npm i
RUN npm run build
RUN ls

EXPOSE 3001

CMD npm run migration:run && npm run start:prod
