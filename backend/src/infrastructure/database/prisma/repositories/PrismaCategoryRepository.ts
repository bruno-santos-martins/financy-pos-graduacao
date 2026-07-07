import { Category } from '../../../../domain/entities/Category.js';
import { ICategoryRepository, CreateCategoryData, UpdateCategoryData } from '../../../../application/ports/repositories/ICategoryRepository.js';
import { prisma } from '../client.js';

export class PrismaCategoryRepository implements ICategoryRepository {
  async create(data: CreateCategoryData): Promise<Category> {
    const category = await prisma.category.create({
      data,
    });

    return new Category(
      category.id,
      category.userId,
      category.name,
      category.icon,
      category.colorClass,
      category.createdAt,
      category.description
    );
  }

  async findByUserId(userId: string): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return categories.map(
      (c) =>
        new Category(
          c.id,
          c.userId,
          c.name,
          c.icon,
          c.colorClass,
          c.createdAt,
          c.description
        )
    );
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) return null;

    return new Category(
      category.id,
      category.userId,
      category.name,
      category.icon,
      category.colorClass,
      category.createdAt,
      category.description
    );
  }

  async update(id: string, data: UpdateCategoryData): Promise<Category> {
    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return new Category(
      category.id,
      category.userId,
      category.name,
      category.icon,
      category.colorClass,
      category.createdAt,
      category.description
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }
}
