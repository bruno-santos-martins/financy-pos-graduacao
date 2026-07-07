import { z } from 'zod';
import { ICategoryRepository } from '../../ports/repositories/ICategoryRepository.js';

const getCategoriesSchema = z.object({
  userId: z.string(),
});

type GetCategoriesInput = z.infer<typeof getCategoriesSchema>;

export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: GetCategoriesInput) {
    const { userId } = getCategoriesSchema.parse(input);

    const categories = await this.categoryRepository.findByUserId(userId);

    return categories;
  }
}
