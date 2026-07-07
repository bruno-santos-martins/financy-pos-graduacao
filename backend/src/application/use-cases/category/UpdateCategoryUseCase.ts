import { z } from 'zod';
import { ICategoryRepository } from '../../../ports/repositories/ICategoryRepository.js';
import { AppError } from '../../../domain/errors/AppError.js';

const updateCategorySchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  userId: z.string(),
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  description: z.string().optional().nullable(),
  icon: z.string().min(1, 'Ícone é obrigatório').optional(),
  colorClass: z.string().min(1, 'Cor é obrigatória').optional(),
});

type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: UpdateCategoryInput) {
    const data = updateCategorySchema.parse(input);

    const category = await this.categoryRepository.findById(data.id);

    if (!category) {
      throw new AppError('Categoria não encontrada', 'NOT_FOUND');
    }

    if (category.userId !== data.userId) {
      throw new AppError('Não autorizado', 'UNAUTHORIZED', 403);
    }

    const updated = await this.categoryRepository.update(data.id, {
      name: data.name,
      description: data.description,
      icon: data.icon,
      colorClass: data.colorClass,
    });

    return updated;
  }
}
