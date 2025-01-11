# FROM node:20.18-alpine3.19
# FROM --platform=linux/amd64 node:20.18-alpine3.19
FROM --platform=$BUILDPLATFORM node:20.18-alpine3.19
# /app esta version de linux viene con el directorio /app

# ⬇️ | cd /app | este comando cambia el directorio de trabajo /app
WORKDIR /app

# Como copiamos el app.js y el package.json
# COPY source destination
# COPY app.js package.json /app/ <- esto hubieramos puesto sino colocamos WORKDIR /app
COPY package.json ./

# Como instalamos las dependencias
RUN npm install

# Copia todo lo del directorio actual al directorio de trabajo
COPY . .

# Realizar testing
RUN npm run test

# Eliminar dependencias y archivos innecesarios
RUN rm -rf tests && rm -rf node_modules

# Instalamos unicamente las dependencias de produccion
RUN npm install --prod


# Como ejecutamos el app.js
# Lo podemos hacer con <node app.js> o <npm start>
CMD ["node", "app.js"]