# Utiliza una imagen de Node.js 18 como imagen base
FROM node:18-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm i --force

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación Angular usando la configuración de producción
RUN npm run build -- --configuration production

# Utiliza una imagen de Nginx para servir la aplicación
FROM nginx:1.21-alpine

# Copia los archivos de la build Angular al directorio donde Nginx espera los archivos
COPY --from=build /app/dist/ori-app /usr/share/nginx/html

# Exponer el puerto que Nginx usará para servir la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
