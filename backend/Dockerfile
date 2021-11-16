# syntax=docker/dockerfile:1

FROM node:16 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM gcr.io/distroless/nodejs:16

WORKDIR /app

COPY --from=build-stage app/node_modules /node_modules
COPY --from=build-stage app/build /src

COPY .env ./
COPY ormconfig.json ./
COPY src/public src/public

ENV PORT=3333

EXPOSE 3333

CMD ["src/server.js"]
