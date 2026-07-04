import { authResolvers } from './auth/resolvers.js';
import { authTypeDefs } from './auth/typeDefs.js';
import { transactionResolvers } from './transaction/resolvers.js';
import { transactionTypeDefs } from './transaction/typeDefs.js';

export const typeDefs = `
  type Query {
    _health: String
  }

  type Mutation {
    _empty: String
  }

  ${authTypeDefs}
  ${transactionTypeDefs}
`;

export const resolvers = {
  Query: {
    _health: () => 'ok',
    ...(transactionResolvers.Query ?? {}),
  },
  Mutation: {
    ...(authResolvers.Mutation ?? {}),
    ...(transactionResolvers.Mutation ?? {}),
  },
};
