import { Transaction } from '../../../../domain/entities/Transaction.js';
import {
  CreateTransactionInput,
  ITransactionRepository,
} from '../../../../application/ports/repositories/ITransactionRepository.js';
import { prisma } from '../client.js';

export class PrismaTransactionRepository implements ITransactionRepository {
  async create(input: CreateTransactionInput) {
    const transaction = await prisma.transaction.create({
      data: {
        userId: input.userId,
        description: input.description,
        amount: input.amount,
        type: input.type,
        date: input.date,
        categoryId: input.categoryId,
      },
    });

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.description,
      transaction.amount,
      transaction.type as 'INCOME' | 'EXPENSE',
      transaction.date,
      transaction.createdAt,
      transaction.categoryId,
    );
  }

  async deleteByIdAndUserId(transactionId: string, userId: string) {
    const result = await prisma.transaction.deleteMany({
      where: {
        id: transactionId,
        userId,
      },
    });

    return result.count > 0;
  }

  async listByUserId(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return transactions.map(
      (transaction) =>
        new Transaction(
          transaction.id,
          transaction.userId,
          transaction.description,
          transaction.amount,
          transaction.type as 'INCOME' | 'EXPENSE',
          transaction.date,
          transaction.createdAt,
          transaction.categoryId,
        ),
    );
  }
}
