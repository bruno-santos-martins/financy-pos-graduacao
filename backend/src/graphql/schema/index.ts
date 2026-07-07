import { authResolvers } from './auth/resolvers.js';
import { authTypeDefs } from './auth/typeDefs.js';
import { transactionResolvers } from './transaction/resolvers.js';
import { transactionTypeDefs } from './transaction/typeDefs.js';
import { categoryResolvers } from './category/resolvers.js';
import { categoryTypeDefs } from './category/typeDefs.js';

export const typeDefs = `
  type Query {
    _health: String
  }

  type Mutation {
    _empty: String
  }

  ${authTypeDefs}
  ${transactionTypeDefs}
  ${categoryTypeDefs}
`;

export const resolvers = {
  Query: {
    _health: () => 'ok',
    ...(transactionResolvers.Query ?? {}),
    ...(categoryResolvers.Query ?? {}),
  },
  Mutation: {
    ...(authResolvers.Mutation ?? {}),
    ...(transactionResolvers.Mutation ?? {}),
    ...(categoryResolvers.Mutation ?? {}),
  },
};
