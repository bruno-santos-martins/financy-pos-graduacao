import { graphqlClient, graphqlClientWithAuth } from '@/services/graphqlClient';
import { CATEGORIES_QUERY } from '@/graphql/category/queries';
import { CREATE_CATEGORY_MUTATION, UPDATE_CATEGORY_MUTATION, DELETE_CATEGORY_MUTATION } from '@/graphql/category/mutations';
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '../types';
import type { 
  CategoriesQuery, 
  CreateCategoryMutation, 
  CreateCategoryMutationVariables,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
} from '@/generated/graphql';

function getAuthClient() {
  const token = localStorage.getItem('financy_token');
  return graphqlClientWithAuth(token);
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const data = await getAuthClient().request<CategoriesQuery>(CATEGORIES_QUERY);
    return data.categories;
  },

  async createCategory(input: CreateCategoryInput): Promise<Category> {
    const data = await getAuthClient().request<CreateCategoryMutation, CreateCategoryMutationVariables>(
      CREATE_CATEGORY_MUTATION,
      input
    );
    return data.createCategory;
  },

  async updateCategory(input: UpdateCategoryInput): Promise<Category> {
    const data = await getAuthClient().request<UpdateCategoryMutation, UpdateCategoryMutationVariables>(
      UPDATE_CATEGORY_MUTATION,
      input
    );
    return data.updateCategory;
  },

  async deleteCategory(id: string): Promise<boolean> {
    const data = await getAuthClient().request<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
      DELETE_CATEGORY_MUTATION,
      { id }
    );
    return data.deleteCategory;
  },
};
