import { z } from 'zod';
import { ICategoryRepository } from '../../../ports/repositories/ICategoryRepository.js';
import { AppError } from '../../../domain/errors/AppError.js';

const deleteCategorySchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  userId: z.string(),
});

type DeleteCategoryInput = z.infer<typeof deleteCategorySchema>;

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: DeleteCategoryInput) {
    const data = deleteCategorySchema.parse(input);

    const category = await this.categoryRepository.findById(data.id);

    if (!category) {
      throw new AppError('Categoria não encontrada', 'NOT_FOUND');
    }

    if (category.userId !== data.userId) {
      throw new AppError('Não autorizado', 'UNAUTHORIZED', 403);
    }

    await this.categoryRepository.delete(data.id);
  }
}
