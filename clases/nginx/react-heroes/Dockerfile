# este stage es para instalar las dependencias de desarrollo
FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json 
RUN npm install --frozen-lockfile

# este para construir el dist de nuestro proyecto
FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# aqui usaremos nginx para desplegar nuestro proyecto
FROM nginx:1.27.5-alpine as server-nginx
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/
COPY ./assets /usr/share/nginx/html/assets
CMD ["nginx", "-g", "daemon off;"]