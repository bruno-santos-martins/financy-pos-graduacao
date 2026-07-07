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
    categoryId: ID
  }

  type DashboardSummary {
    balance: Float!
    income: Float!
    expenses: Float!
    recentTransactions: [Transaction!]!
  }

  extend type Query {
    dashboardSummary: DashboardSummary!
    transactions: [Transaction!]!
  }

  extend type Mutation {
    createTransaction(description: String!, amount: Float!, type: TransactionType!, date: String!, categoryId: ID): Transaction!
    deleteTransaction(transactionId: ID!): Boolean!
  }
`;
