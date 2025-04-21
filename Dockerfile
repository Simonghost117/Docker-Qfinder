# Etapa 1: Construcción del frontend
FROM node:18 AS builder
WORKDIR /app

# Copiar solo el frontend
COPY client ./client

# Instalar dependencias y construir el frontend
WORKDIR /app/client
RUN npm install
RUN npm run build

# Etapa 2: Backend + archivos estáticos
FROM node:18
WORKDIR /app

# Copiar todo el backend (menos node_modules si está en .dockerignore)
COPY . .

# Copiar solo el resultado del build del frontend desde la etapa anterior
COPY --from=builder /app/client/dist ./client/dist

# Instalar dependencias del backend
RUN npm install

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]