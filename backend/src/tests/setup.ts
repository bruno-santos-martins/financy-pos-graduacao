import { execSync } from 'child_process';
import { beforeAll } from 'vitest';
import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis de ambiente de teste ANTES de instanciar o Prisma
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

// Definimos o DATABASE_URL hardcoded também por segurança para forçar o banco de testes
process.env.DATABASE_URL = "file:./bd_test.db";

beforeAll(() => {
  // Roda o push do schema no banco de testes antes de rodar a suite de testes de integração
  execSync('npx prisma db push --accept-data-loss', {
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
    }
  });
});
