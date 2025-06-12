#!/bin/sh

set -e

echo "Entrypoint: Iniciando..."

echo "Entrypoint: Gerando o Prisma Client..."
npx prisma generate

echo "Entrypoint: Rodando as migrações do banco de dados..."
npm run db:migrate

echo "Entrypoint: Iniciando a aplicação..."

exec "$@"