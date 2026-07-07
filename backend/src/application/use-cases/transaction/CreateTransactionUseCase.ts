import { z } from 'zod';
import { ITransactionRepository } from '../../ports/repositories/ITransactionRepository.js';

const createTransactionSchema = z.object({
  userId: z.string().min(1),
  description: z.string().min(2),
  amount: z.number().positive(),
  type: z.enum(['INCOME', 'EXPENSE']),
  date: z.date().or(z.string().transform(str => new Date(str))),
  categoryId: z.string().optional().nullable(),
});

type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: CreateTransactionInput) {
    const data = createTransactionSchema.parse(input);
    return this.transactionRepository.create(data);
  }
}
