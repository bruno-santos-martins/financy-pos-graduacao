import {
  CreateTransactionInput,
  ITransactionRepository,
} from '../../../application/ports/repositories/ITransactionRepository.js';
import { Transaction } from '../../../domain/entities/Transaction.js';

export class FakeTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async create(input: CreateTransactionInput) {
    const transaction = new Transaction(
      crypto.randomUUID(),
      input.userId,
      input.description,
      input.amount,
      input.type,
      input.date,
      new Date(),
      input.categoryId,
    );
    this.transactions.unshift(transaction);
    return transaction;
  }

  async deleteByIdAndUserId(transactionId: string, userId: string) {
    const before = this.transactions.length;
    this.transactions = this.transactions.filter((item) => !(item.id === transactionId && item.userId === userId));
    return this.transactions.length !== before;
  }

  async listByUserId(userId: string) {
    return this.transactions.filter((item) => item.userId === userId);
  }
}
