import type { DashboardSummary } from '@/shared/types';
import type { LoginResponse } from '@/features/auth/types';

export type LoginMutationVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  login: LoginResponse;
};

export type RegisterMutationVariables = {
  name: string;
  email: string;
  password: string;
};

export type RegisterMutation = {
  register: {
    id: string;
    name: string;
    email: string;
  };
};

export type DashboardQuery = {
  dashboardSummary: DashboardSummary;
};

export type CategoriesQuery = {
  categories: {
    id: string;
    name: string;
    description?: string;
    icon: string;
    colorClass: string;
  }[];
};

export type CreateCategoryMutationVariables = {
  name: string;
  description?: string;
  icon: string;
  colorClass: string;
};

export type CreateCategoryMutation = {
  createCategory: {
    id: string;
    name: string;
    description?: string;
    icon: string;
    colorClass: string;
  };
};

export type UpdateCategoryMutationVariables = {
  id: string;
  name?: string;
  description?: string;
  icon?: string;
  colorClass?: string;
};

export type UpdateCategoryMutation = {
  updateCategory: {
    id: string;
    name: string;
    description?: string;
    icon: string;
    colorClass: string;
  };
};

export type DeleteCategoryMutationVariables = {
  id: string;
};

export type DeleteCategoryMutation = {
  deleteCategory: boolean;
};
