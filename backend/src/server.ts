import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { buildContainer } from './container.js';
import { createContext } from './graphql/context.js';
import { resolvers, typeDefs } from './graphql/schema/index.js';
import { prisma } from './infrastructure/database/prisma/client.js';

const jwtSecret = process.env.JWT_SECRET ?? 'supersecret';
const port = Number(process.env.PORT ?? 4000);

async function ensureDefaultUser() {
  const container = buildContainer({ jwtSecret });
  const existing = await container.userRepository.findByEmail('usuario@usuario.com');

  if (existing) {
    return;
  }

  await container.registerUseCase.execute({
    name: 'Usuário Padrão',
    email: 'usuario@usuario.com',
    password: '123456',
  });

  await container.createTransactionUseCase.execute({
    userId: (await container.userRepository.findByEmail('usuario@usuario.com'))!.id,
    description: 'Salário',
    amount: 3500,
    type: 'INCOME',
  });

  await container.createTransactionUseCase.execute({
    userId: (await container.userRepository.findByEmail('usuario@usuario.com'))!.id,
    description: 'Aluguel',
    amount: 1200,
    type: 'EXPENSE',
  });
}

async function bootstrap() {
  await ensureDefaultUser();

  const container = buildContainer({ jwtSecret });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        return createContext({
          authorization: req.headers.authorization,
          container,
        });
      },
    }),
  );

  app.listen(port, () => {
    console.log(`Backend GraphQL running at http://localhost:${port}/graphql`);
  });
}

bootstrap().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});