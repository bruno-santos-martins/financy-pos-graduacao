export type TransactionType = 'INCOME' | 'EXPENSE';

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId?: string | null;
};

export type CreateTransactionInput = {
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId?: string | null;
};
