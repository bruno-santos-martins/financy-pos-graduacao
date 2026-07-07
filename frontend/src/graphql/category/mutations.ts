import { gql } from 'graphql-request';

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($name: String!, $description: String, $icon: String!, $colorClass: String!) {
    createCategory(name: $name, description: $description, icon: $icon, colorClass: $colorClass) {
      id
      name
      description
      icon
      colorClass
    }
  }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: ID!, $name: String, $description: String, $icon: String, $colorClass: String) {
    updateCategory(id: $id, name: $name, description: $description, icon: $icon, colorClass: $colorClass) {
      id
      name
      description
      icon
      colorClass
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
