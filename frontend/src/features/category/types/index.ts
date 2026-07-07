export type Category = {
  id: string;
  name: string;
  description?: string;
  icon: string;
  colorClass: string;
};

export type CreateCategoryInput = {
  name: string;
  description?: string;
  icon: string;
  colorClass: string;
};

export type UpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string;
  icon?: string;
  colorClass?: string;
};
