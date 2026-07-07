import { Category } from '../../../domain/entities/Category.js';
import { ICategoryRepository, CreateCategoryData, UpdateCategoryData } from '../../../application/ports/repositories/ICategoryRepository.js';

export class FakeCategoryRepository implements ICategoryRepository {
  public categories: Category[] = [];

  async create(data: CreateCategoryData): Promise<Category> {
    const category = new Category(
      String(this.categories.length + 1),
      data.userId,
      data.name,
      data.icon,
      data.colorClass,
      new Date(),
      data.description
    );
    this.categories.push(category);
    return category;
  }

  async findByUserId(userId: string): Promise<Category[]> {
    return this.categories
      .filter((c) => c.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((c) => c.id === id);
    return category || null;
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    const categoryIndex = this.categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) throw new Error('Category not found');

    const category = this.categories[categoryIndex];
    const updatedCategory = new Category(
      category.id,
      category.userId,
      data.name !== undefined ? data.name : category.name,
      data.icon !== undefined ? data.icon : category.icon,
      data.colorClass !== undefined ? data.colorClass : category.colorClass,
      category.createdAt,
      data.description !== undefined ? data.description : category.description
    );

    this.categories[categoryIndex] = updatedCategory;
    return updatedCategory;
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
  }
}
