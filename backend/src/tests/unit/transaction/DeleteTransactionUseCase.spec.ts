import { describe, expect, it } from 'vitest';
import { DeleteTransactionUseCase } from '../../../application/use-cases/transaction/DeleteTransactionUseCase.js';
import { FakeTransactionRepository } from '../../fakes/repositories/FakeTransactionRepository.js';

describe('DeleteTransactionUseCase', () => {
  it('deve remover transação existente', async () => {
    const repository = new FakeTransactionRepository();
    const createResult = await repository.create({
      userId: 'user-1',
      description: 'Conta',
      amount: 100,
      type: 'EXPENSE',
    });
    const useCase = new DeleteTransactionUseCase(repository);

    const result = await useCase.execute({
      transactionId: createResult.id,
      userId: 'user-1',
    });

    expect(result.success).toBe(true);
  });
});
