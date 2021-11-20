# syntax=docker/dockerfile:1

FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:stable-alpine as production

COPY --from=development /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
