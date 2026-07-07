import { z } from 'zod';
import { ITransactionRepository } from '../../ports/repositories/ITransactionRepository.js';

const getTransactionsSchema = z.object({
  userId: z.string().min(1),
});

type GetTransactionsInput = z.infer<typeof getTransactionsSchema>;

export class GetTransactionsUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: GetTransactionsInput) {
    const { userId } = getTransactionsSchema.parse(input);
    return this.transactionRepository.listByUserId(userId);
  }
}
