import { z } from 'zod';
import { AppError } from '../../../domain/errors/AppError.js';
import { ITransactionRepository } from '../../ports/repositories/ITransactionRepository.js';

const deleteTransactionSchema = z.object({
  transactionId: z.string().min(1),
  userId: z.string().min(1),
});

type DeleteTransactionInput = z.infer<typeof deleteTransactionSchema>;

export class DeleteTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: DeleteTransactionInput) {
    const data = deleteTransactionSchema.parse(input);
    const deleted = await this.transactionRepository.deleteByIdAndUserId(data.transactionId, data.userId);

    if (!deleted) {
      throw new AppError('Transação não encontrada', 'TRANSACTION_NOT_FOUND');
    }

    return { success: true };
  }
}
