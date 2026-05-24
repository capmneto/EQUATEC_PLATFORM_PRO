FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
ENV DATABASE_URL="mysql://fantasma:fantasma@localhost:3306/fantasma"
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]