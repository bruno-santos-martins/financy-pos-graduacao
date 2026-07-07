import { graphqlClientWithAuth } from '@/services/graphqlClient';
import type { Transaction, CreateTransactionInput } from '../types';

const GET_TRANSACTIONS_QUERY = `
  query GetTransactions {
    transactions {
      id
      description
      amount
      type
      date
      categoryId
    }
  }
`;

const CREATE_TRANSACTION_MUTATION = `
  mutation CreateTransaction(
    $description: String!, 
    $amount: Float!, 
    $type: TransactionType!,
    $date: String!,
    $categoryId: ID
  ) {
    createTransaction(
      description: $description,
      amount: $amount,
      type: $type,
      date: $date,
      categoryId: $categoryId
    ) {
      id
      description
      amount
      type
      date
      categoryId
    }
  }
`;

function getAuthClient() {
  const token = localStorage.getItem('financy_token');
  return graphqlClientWithAuth(token);
}

export const transactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const data = await getAuthClient().request<{ transactions: Transaction[] }>(GET_TRANSACTIONS_QUERY);
    return data.transactions;
  },

  createTransaction: async (input: CreateTransactionInput): Promise<Transaction> => {
    const data = await getAuthClient().request<{ createTransaction: Transaction }>(
      CREATE_TRANSACTION_MUTATION,
      input
    );
    return data.createTransaction;
  }
};
