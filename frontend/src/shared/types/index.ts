export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
};

export type DashboardSummary = {
  balance: number;
  income: number;
  expenses: number;
  recentTransactions: Transaction[];
};
