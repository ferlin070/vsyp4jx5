# Self-hosted deploy: build the app, serve it with nginx (SPA fallback).
#   docker build -t ponytail-pro-max .
#   docker run -p 8080:80 ponytail-pro-max

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]