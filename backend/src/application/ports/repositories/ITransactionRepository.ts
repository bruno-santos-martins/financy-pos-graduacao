import { Transaction, TransactionType } from '../../../domain/entities/Transaction.js';

export type CreateTransactionInput = {
  userId: string;
  description: string;
  amount: number;
  type: TransactionType;
};

export interface ITransactionRepository {
  create(input: CreateTransactionInput): Promise<Transaction>;
  deleteByIdAndUserId(transactionId: string, userId: string): Promise<boolean>;
  listByUserId(userId: string): Promise<Transaction[]>;
}
