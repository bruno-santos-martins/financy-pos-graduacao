export const categoryTypeDefs = `
  type Category {
    id: ID!
    name: String!
    description: String
    icon: String!
    colorClass: String!
  }

  extend type Query {
    categories: [Category!]!
  }

  extend type Mutation {
    createCategory(name: String!, description: String, icon: String!, colorClass: String!): Category!
    updateCategory(id: ID!, name: String, description: String, icon: String, colorClass: String): Category!
    deleteCategory(id: ID!): Boolean!
  }
`;
