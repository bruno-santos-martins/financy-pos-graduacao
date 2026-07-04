import { z } from 'zod';
import { ITransactionRepository } from '../../ports/repositories/ITransactionRepository.js';

const summarySchema = z.object({
  userId: z.string().min(1),
});

type SummaryInput = z.infer<typeof summarySchema>;

export class GetDashboardSummaryUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: SummaryInput) {
    const data = summarySchema.parse(input);
    const transactions = await this.transactionRepository.listByUserId(data.userId);

    const income = transactions
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expenses = transactions
      .filter((transaction) => transaction.type === 'EXPENSE')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return {
      balance: income - expenses,
      income,
      expenses,
      recentTransactions: transactions.slice(0, 10),
    };
  }
}
