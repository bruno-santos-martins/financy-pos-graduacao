import { describe, expect, it } from 'vitest';
import { CreateCategoryUseCase } from '../../../application/use-cases/category/CreateCategoryUseCase.js';
import { FakeCategoryRepository } from '../../fakes/repositories/FakeCategoryRepository.js';

describe('CreateCategoryUseCase', () => {
  it('should be able to create a new category', async () => {
    const categoryRepository = new FakeCategoryRepository();
    const sut = new CreateCategoryUseCase(categoryRepository);

    const category = await sut.execute({
      userId: 'user-1',
      name: 'Alimentação',
      description: 'Gastos com comida',
      icon: 'Utensils',
      colorClass: '#16A34A',
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Alimentação');
    expect(category.userId).toBe('user-1');
  });

  it('should not be able to create a category without a name', async () => {
    const categoryRepository = new FakeCategoryRepository();
    const sut = new CreateCategoryUseCase(categoryRepository);

    await expect(sut.execute({
      userId: 'user-1',
      name: '',
      description: 'Gastos com comida',
      icon: 'Utensils',
      colorClass: '#16A34A',
    })).rejects.toThrow();
  });
});
