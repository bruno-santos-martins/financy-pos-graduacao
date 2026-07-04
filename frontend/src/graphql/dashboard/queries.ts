import { gql } from 'graphql-request';

export const DASHBOARD_QUERY = gql`
  query DashboardSummary {
    dashboardSummary {
      balance
      income
      expenses
      recentTransactions {
        id
        description
        amount
        date
        type
      }
    }
  }
`;
