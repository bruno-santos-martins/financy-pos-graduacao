export const transactionTypeDefs = `
  enum TransactionType {
    INCOME
    EXPENSE
  }

  type Transaction {
    id: ID!
    description: String!
    amount: Float!
    type: TransactionType!
    date: String!
  }

  type DashboardSummary {
    balance: Float!
    income: Float!
    expenses: Float!
    recentTransactions: [Transaction!]!
  }

  extend type Query {
    dashboardSummary: DashboardSummary!
  }

  extend type Mutation {
    createTransaction(description: String!, amount: Float!, type: TransactionType!): Transaction!
    deleteTransaction(transactionId: ID!): Boolean!
  }
`;
