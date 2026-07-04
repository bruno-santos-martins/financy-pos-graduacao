import type { DashboardSummary } from '@/shared/types';
import type { LoginResponse } from '@/features/auth/types';

export type LoginMutationVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  login: LoginResponse;
};

export type DashboardQuery = {
  dashboardSummary: DashboardSummary;
};
