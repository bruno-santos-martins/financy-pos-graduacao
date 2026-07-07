import { Category } from '../../../domain/entities/Category.js';

export type CreateCategoryData = {
  userId: string;
  name: string;
  description?: string | null;
  icon: string;
  colorClass: string;
};

export type UpdateCategoryData = {
  name?: string;
  description?: string | null;
  icon?: string;
  colorClass?: string;
};

export interface ICategoryRepository {
  create(data: CreateCategoryData): Promise<Category>;
  findByUserId(userId: string): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  update(id: string, data: UpdateCategoryData): Promise<Category>;
  delete(id: string): Promise<void>;
}
