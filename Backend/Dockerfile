# Usa una imagen base de Node.js
FROM node:20-alpine AS builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app/src/app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Copia solo los archivos de configuración primero para aprovechar la cache
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu proyecto
COPY . .

RUN npm run build

# Expon el puerto en el que corre tu app
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["npm", "run", "debug"]