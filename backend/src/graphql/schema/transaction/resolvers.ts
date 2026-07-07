import { GraphQLError } from 'graphql';
import { AppError } from '../../../domain/errors/AppError.js';
import { GraphQLContext } from '../../context.js';

type CreateTransactionArgs = {
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  categoryId?: string | null;
};

type DeleteTransactionArgs = {
  transactionId: string;
};

export const transactionResolvers = {
  Query: {
    dashboardSummary: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.userId) {
        throw new GraphQLError('Não autenticado', { extensions: { code: 'UNAUTHORIZED' } });
      }

      const summary = await context.container.getDashboardSummaryUseCase.execute({
        userId: context.userId,
      });

      return {
        ...summary,
        recentTransactions: summary.recentTransactions.map((transaction) => ({
          id: transaction.id,
          description: transaction.description,
          amount: transaction.amount,
          type: transaction.type,
          date: transaction.date.toISOString(),
          categoryId: transaction.categoryId,
        })),
      };
    },
    transactions: async (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.userId) {
        throw new GraphQLError('Não autenticado', { extensions: { code: 'UNAUTHORIZED' } });
      }

      const txs = await context.container.getTransactionsUseCase.execute({
        userId: context.userId,
      });

      return txs.map(transaction => ({
        id: transaction.id,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date.toISOString(),
        categoryId: transaction.categoryId,
      }));
    },
  },
  Mutation: {
    createTransaction: async (_: unknown, args: CreateTransactionArgs, context: GraphQLContext) => {
      if (!context.userId) {
        throw new GraphQLError('Não autenticado', { extensions: { code: 'UNAUTHORIZED' } });
      }

      try {
        const transaction = await context.container.createTransactionUseCase.execute({
          userId: context.userId,
          description: args.description,
          amount: args.amount,
          type: args.type,
          date: args.date,
          categoryId: args.categoryId,
        });

        return {
          id: transaction.id,
          description: transaction.description,
          amount: transaction.amount,
          type: transaction.type,
          date: transaction.date.toISOString(),
          categoryId: transaction.categoryId,
        };
      } catch (error) {
        if (error instanceof AppError) {
          throw new GraphQLError(error.message, {
            extensions: { code: error.code },
          });
        }
        throw error;
      }
    },
    deleteTransaction: async (_: unknown, args: DeleteTransactionArgs, context: GraphQLContext) => {
      if (!context.userId) {
        throw new GraphQLError('Não autenticado', { extensions: { code: 'UNAUTHORIZED' } });
      }

      try {
        await context.container.deleteTransactionUseCase.execute({
          transactionId: args.transactionId,
          userId: context.userId,
        });
        return true;
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
