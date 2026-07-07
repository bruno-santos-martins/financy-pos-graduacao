import { GraphQLContext } from '../../context.js';
import { UnauthorizedError } from '../../../domain/errors/UnauthorizedError.js';

type CreateCategoryArgs = {
  name: string;
  description?: string;
  icon: string;
  colorClass: string;
};

export const categoryResolvers = {
  Query: {
    categories: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.userId) {
        throw new UnauthorizedError();
      }

      return await context.container.getCategoriesUseCase.execute({
        userId: context.userId,
      });
    },
  },
  Mutation: {
    createCategory: async (_: unknown, args: CreateCategoryArgs, context: GraphQLContext) => {
      if (!context.userId) {
        throw new UnauthorizedError();
      }

      try {
        return await context.container.createCategoryUseCase.execute({
          userId: context.userId,
          ...args,
        });
      } catch (error) {
        console.error("Error in createCategory resolver:", error);
        throw error;
      }
    },
    updateCategory: async (_: unknown, args: any, context: GraphQLContext) => {
      if (!context.userId) throw new UnauthorizedError();
      return await context.container.updateCategoryUseCase.execute({
        userId: context.userId,
        ...args,
      });
    },
    deleteCategory: async (_: unknown, { id }: { id: string }, context: GraphQLContext) => {
      if (!context.userId) throw new UnauthorizedError();
      await context.container.deleteCategoryUseCase.execute({
        userId: context.userId,
        id,
      });
      return true;
    },
  },
};
