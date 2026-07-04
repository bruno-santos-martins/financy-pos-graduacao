import { RecentTransactions, SummaryCard, useDashboard } from '@/features/dashboard';
import { Layout } from '@/shared/components/Layout';

export function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <Layout title="Dashboard">
        <p>Carregando...</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout title="Dashboard">
        <p>Sem dados para exibir.</p>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="row">
        <SummaryCard title="Saldo" value={data.balance} />
        <SummaryCard title="Receitas" value={data.income} />
        <SummaryCard title="Despesas" value={data.expenses} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <RecentTransactions transactions={data.recentTransactions} />
      </div>
    </Layout>
  );
}
