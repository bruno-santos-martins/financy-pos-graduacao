import { gql } from 'graphql-request';

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
      description
      icon
      colorClass
    }
  }
`;
