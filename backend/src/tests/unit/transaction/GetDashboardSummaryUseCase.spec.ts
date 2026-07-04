import { describe, expect, it } from 'vitest';
import { GetDashboardSummaryUseCase } from '../../../application/use-cases/transaction/GetDashboardSummaryUseCase.js';
import { FakeTransactionRepository } from '../../fakes/repositories/FakeTransactionRepository.js';

describe('GetDashboardSummaryUseCase', () => {
  it('deve calcular resumo', async () => {
    const repository = new FakeTransactionRepository();
    const useCase = new GetDashboardSummaryUseCase(repository);

    await repository.create({
      userId: 'user-1',
      description: 'Salário',
      amount: 1000,
      type: 'INCOME',
    });

    await repository.create({
      userId: 'user-1',
      description: 'Mercado',
      amount: 200,
      type: 'EXPENSE',
    });

    const summary = await useCase.execute({ userId: 'user-1' });

    expect(summary.income).toBe(1000);
    expect(summary.expenses).toBe(200);
    expect(summary.balance).toBe(800);
  });
});
