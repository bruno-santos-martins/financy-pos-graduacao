export const authTypeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(name: String!, email: String!, password: String!): User!
  }
`;
