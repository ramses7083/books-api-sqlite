# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Genera Prisma Client y compila TypeScript
RUN npx prisma generate
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]