import { RecentTransactions, SummaryCard, useDashboard } from '@/features/dashboard';
import { CategoriesList } from '@/features/dashboard/components/CategoriesList';
import { Layout } from '@/shared/components/Layout';
import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <Layout>
        <p>Carregando...</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <p>Sem dados para exibir.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard-grid">
        <SummaryCard 
          title="Saldo Total" 
          value={data.balance} 
          icon={<Wallet size={20} color="var(--purple-base)" />} 
        />
        <SummaryCard 
          title="Receitas do Mês" 
          value={data.income} 
          icon={<ArrowUpCircle size={20} color="var(--green-dark)" />} 
        />
        <SummaryCard 
          title="Despesas do Mês" 
          value={data.expenses} 
          icon={<ArrowDownCircle size={20} color="var(--danger)" />} 
        />
      </div>

      <div className="dashboard-content-grid">
        <div>
          <RecentTransactions transactions={data.recentTransactions} />
        </div>
        <div>
          <CategoriesList />
        </div>
      </div>
    </Layout>
  );
}
