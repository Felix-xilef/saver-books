# syntax=docker/dockerfile:1

FROM node:16 as builder-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM gcr.io/distroless/nodejs:16

COPY --from=builder-stage /node_modules /node_modules
COPY --from=builder-stage /dist /dist

COPY src/public dist/src/public

ENV PORT=3333

EXPOSE 3333

CMD ["dist/src/server.js"]
