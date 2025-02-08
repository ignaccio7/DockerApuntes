# Primera Etapa
# Dependencias de desarrollo
FROM --platform=$BUILDPLATFORM node:20.18-alpine3.19 AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install




# Segunda Etapa
# Build y Test
FROM --platform=$BUILDPLATFORM node:20.18-alpine3.19 AS tester-builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run test
# RUN npm run build <- Como no tenemos ese paso lo comentamos




# Tercera Etapa
# Dependencias de produccion. Almacenamos en una imagen separada dependencias solo de produccion
FROM --platform=$BUILDPLATFORM node:20.18-alpine3.19 AS dependencies-prod
WORKDIR /app
COPY package.json ./
RUN npm install --prod



# Cuarta Etapa
# Ejecutar la app
FROM --platform=$BUILDPLATFORM node:20.18-alpine3.19 AS runner
WORKDIR /app
COPY --from=dependencies-prod /app/node_modules ./node_modules
COPY app.js ./
COPY tasks ./tasks



# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]