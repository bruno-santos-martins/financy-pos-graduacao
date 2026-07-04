import { useQuery } from '@tanstack/react-query';
import { DASHBOARD_QUERY } from '@/graphql/dashboard/queries';
import { graphqlClient } from '@/services/graphqlClient';
import type { DashboardSummary } from '@/shared/types';
import type { DashboardQuery } from '@/generated/graphql';

const MOCK_DATA: DashboardSummary = {
  balance: 2450.35,
  income: 5400,
  expenses: 2949.65,
  recentTransactions: [
    { id: '1', description: 'Salário', amount: 5000, date: '2026-07-01', type: 'INCOME' },
    { id: '2', description: 'Mercado', amount: 350, date: '2026-07-02', type: 'EXPENSE' },
    { id: '3', description: 'Internet', amount: 120, date: '2026-07-03', type: 'EXPENSE' },
  ],
};

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      try {
        const data = await graphqlClient.request<DashboardQuery>(DASHBOARD_QUERY);
        return data.dashboardSummary ?? MOCK_DATA;
      } catch {
        return MOCK_DATA;
      }
    },
  });
}
