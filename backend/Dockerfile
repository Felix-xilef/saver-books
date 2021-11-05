# syntax=docker/dockerfile:1

FROM node:14

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3333

CMD npm run prod
