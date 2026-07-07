export type TransactionType = 'INCOME' | 'EXPENSE';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly date: Date,
    public readonly createdAt: Date,
    public readonly categoryId?: string | null,
  ) {}
}
