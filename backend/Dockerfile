# syntax=docker/dockerfile:1

FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build


FROM node:16-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/build ./build

COPY ./src/public ./build/public

ENV PORT=3333

EXPOSE 3333

CMD ["node", "build/server"]
