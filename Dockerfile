FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

CMD ["sh", "-c", "while ! nc -z mongo 27017; do sleep 2; echo 'Esperando a MongoDB...'; done && npm start"]