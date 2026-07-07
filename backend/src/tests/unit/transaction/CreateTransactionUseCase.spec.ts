import { describe, expect, it } from 'vitest';
import { CreateTransactionUseCase } from '../../../application/use-cases/transaction/CreateTransactionUseCase.js';
import { FakeTransactionRepository } from '../../fakes/repositories/FakeTransactionRepository.js';

describe('CreateTransactionUseCase', () => {
  it('deve criar transação', async () => {
    const repository = new FakeTransactionRepository();
    const useCase = new CreateTransactionUseCase(repository);

    const result = await useCase.execute({
      userId: 'user-1',
      description: 'Salário',
      amount: 1000,
      type: 'INCOME',
      date: new Date('2025-01-01'),
    });

    expect(result.description).toBe('Salário');
  });
});
