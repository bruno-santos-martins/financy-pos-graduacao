import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { useAuth } from '@/features/auth';

export function App() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
}
