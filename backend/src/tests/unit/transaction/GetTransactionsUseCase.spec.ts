import { describe, expect, it } from 'vitest';
import { GetTransactionsUseCase } from '../../../application/use-cases/transaction/GetTransactionsUseCase.js';
import { FakeTransactionRepository } from '../../fakes/repositories/FakeTransactionRepository.js';

describe('GetTransactionsUseCase', () => {
  it('deve listar transacoes do usuario', async () => {
    const repository = new FakeTransactionRepository();
    const useCase = new GetTransactionsUseCase(repository);

    await repository.create({
      userId: 'user-1',
      description: 'Salário',
      amount: 1000,
      type: 'INCOME',
      date: new Date('2025-01-01'),
    });

    await repository.create({
      userId: 'user-1',
      description: 'Mercado',
      amount: 100,
      type: 'EXPENSE',
      date: new Date('2025-01-02'),
    });

    await repository.create({
      userId: 'user-2',
      description: 'Outra transação',
      amount: 50,
      type: 'EXPENSE',
      date: new Date('2025-01-03'),
    });

    const result = await useCase.execute({ userId: 'user-1' });

    expect(result).toHaveLength(2);
    expect(result[0].description).toBe('Mercado'); // assuming order is sorted descending by createdAt
  });
});
