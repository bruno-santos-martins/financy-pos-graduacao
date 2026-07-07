import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../services/categoryService';
import type { CreateCategoryInput } from '../types';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryInput) => categoryService.createCategory(data),
    onSuccess: () => {
      // Invalida a query de categorias para forçar um recarregamento
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
