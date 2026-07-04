import { useQuery } from '@tanstack/react-query';
import { DASHBOARD_QUERY } from '@/graphql/dashboard/queries';
import { graphqlClientWithAuth } from '@/services/graphqlClient';
import type { DashboardQuery } from '@/generated/graphql';
import { useAuth } from '@/features/auth';

export function useDashboard() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['dashboard-summary', token],
    queryFn: async () => {
      const data = await graphqlClientWithAuth(token).request<DashboardQuery>(DASHBOARD_QUERY);
      return data.dashboardSummary;
    },
    enabled: Boolean(token),
  });
}
