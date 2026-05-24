# 1. Base image
FROM node:22-alpine

# 2. Work directory
WORKDIR /app

# 3. Definimos a variável de ambiente logo no início para o Prisma não travar
ENV DATABASE_URL="mysql://fantasma:fantasma@localhost:3306/fantasma"

# 4. Instalação de dependências
COPY package*.json ./
RUN npm ci

# 5. Copia os arquivos do projeto
COPY . .

# 6. Processa o Tailwind manualmente antes do build para garantir o estilo
RUN npx tailwindcss -i ./app/globals.css -o ./app/globals.css --minify

# 7. Gera o Prisma Client
RUN npx prisma generate

# 8. Build da aplicação Next.js
RUN npm run build

# 9. Comando de inicialização
CMD ["npm", "start"]