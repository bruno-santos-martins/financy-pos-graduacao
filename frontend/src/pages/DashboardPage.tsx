import { useState } from 'react';
import { RecentTransactions, SummaryCard, useDashboard } from '@/features/dashboard';
import { CreateTransactionModal } from '@/features/transactions';
import { CategoriesList } from '@/features/dashboard/components/CategoriesList';
import { Layout } from '@/shared/components/Layout';
import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export function DashboardPage() {
  const { data, isLoading } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <p>Carregando...</p>
      </Layout>
    );
  }

  // Use the real data if it exists, otherwise use empty values but still render the dashboard
  const displayData = data || {
    balance: 0,
    income: 0,
    expenses: 0,
    recentTransactions: []
  };

  return (
    <Layout>
      <div className="dashboard-grid">
        <div className="dashboard-grid-left">
          <SummaryCard 
            title="Saldo Total" 
            value={displayData.balance} 
            icon={<Wallet size={20} color="var(--purple-base)" />} 
          />
          <SummaryCard 
            title="Receitas do Mês" 
            value={displayData.income} 
            icon={<ArrowUpCircle size={20} color="var(--green-dark)" />} 
          />
        </div>
        <SummaryCard 
          title="Despesas do Mês" 
          value={displayData.expenses} 
          icon={<ArrowDownCircle size={20} color="var(--danger)" />} 
        />
      </div>

      <div className="dashboard-content-grid">
        <div>
          <RecentTransactions 
            transactions={displayData.recentTransactions} 
            onNewTransaction={() => setIsModalOpen(true)}
          />
        </div>
        <div>
          <CategoriesList />
        </div>
      </div>

      <CreateTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}
