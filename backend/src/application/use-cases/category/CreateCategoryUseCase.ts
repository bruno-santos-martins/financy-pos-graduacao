import { z } from 'zod';
import { ICategoryRepository } from '../../ports/repositories/ICategoryRepository.js';

const createCategorySchema = z.object({
  userId: z.string(),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional().nullable(),
  icon: z.string().min(1, 'Ícone é obrigatório'),
  colorClass: z.string().min(1, 'Cor é obrigatória'),
});

type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: CreateCategoryInput) {
    const data = createCategorySchema.parse(input);

    const category = await this.categoryRepository.create(data);

    return category;
  }
}
