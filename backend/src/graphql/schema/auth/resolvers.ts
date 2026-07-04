import { GraphQLError } from 'graphql';
import { AppError } from '../../../domain/errors/AppError.js';
import { GraphQLContext } from '../../context.js';

type LoginArgs = {
  email: string;
  password: string;
};

type RegisterArgs = {
  name: string;
  email: string;
  password: string;
};

export const authResolvers = {
  Mutation: {
    login: async (_: unknown, args: LoginArgs, context: GraphQLContext) => {
      try {
        return await context.container.loginUseCase.execute(args);
      } catch (error) {
        if (error instanceof AppError) {
          throw new GraphQLError(error.message, {
            extensions: { code: error.code },
          });
        }
        throw error;
      }
    },
    register: async (_: unknown, args: RegisterArgs, context: GraphQLContext) => {
      try {
        return await context.container.registerUseCase.execute(args);
      } catch (error) {
        if (error instanceof AppError) {
          throw new GraphQLError(error.message, {
            extensions: { code: error.code },
          });
        }
        throw error;
      }
    },
  },
};
