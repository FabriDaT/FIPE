# Usa una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia solo los archivos de configuración primero para aprovechar la cache
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu proyecto
COPY . .

# Construye la aplicación (si es necesario)
RUN npm run build

# Expon el puerto en el que corre tu app
EXPOSE 3001

# Comando para ejecutar el servidor
CMD ["npm", "start"]