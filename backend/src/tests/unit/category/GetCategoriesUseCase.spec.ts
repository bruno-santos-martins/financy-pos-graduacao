import { describe, expect, it } from 'vitest';
import { GetCategoriesUseCase } from '../../../application/use-cases/category/GetCategoriesUseCase.js';
import { FakeCategoryRepository } from '../../fakes/repositories/FakeCategoryRepository.js';

describe('GetCategoriesUseCase', () => {
  it('should be able to get categories by user id', async () => {
    const categoryRepository = new FakeCategoryRepository();
    const sut = new GetCategoriesUseCase(categoryRepository);

    await categoryRepository.create({
      userId: 'user-1',
      name: 'Alimentação',
      description: 'Gastos com comida',
      icon: 'Utensils',
      colorClass: '#16A34A',
    });

    await categoryRepository.create({
      userId: 'user-2',
      name: 'Transporte',
      description: 'Gastos com carro',
      icon: 'Car',
      colorClass: '#2563EB',
    });

    const categories = await sut.execute({ userId: 'user-1' });

    expect(categories).toHaveLength(1);
    expect(categories[0].name).toBe('Alimentação');
  });
});
