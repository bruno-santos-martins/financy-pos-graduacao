import { ChevronRight, Plus, Briefcase, Utensils, Car, ShoppingCart, TrendingUp } from 'lucide-react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import type { Transaction } from '@/shared/types';

type RecentTransactionsProps = {
  transactions: Transaction[];
  onNewTransaction?: () => void;
};

// Helper function to mock category badge based on description or type
function getCategoryMock(transaction: Transaction) {
  const desc = transaction.description.toLowerCase();
  if (desc.includes('salário')) return { name: 'Receita', icon: <Briefcase size={20} color="var(--green-dark)" />, colorClass: 'bg-green' };
  if (desc.includes('restaurante') || desc.includes('ifood')) return { name: 'Alimentação', icon: <Utensils size={20} color="var(--blue-dark)" />, colorClass: 'bg-blue' };
  if (desc.includes('gasolina') || desc.includes('uber')) return { name: 'Transporte', icon: <Car size={20} color="var(--purple-dark)" />, colorClass: 'bg-purple' };
  if (desc.includes('mercado')) return { name: 'Mercado', icon: <ShoppingCart size={20} color="var(--orange-dark)" />, colorClass: 'bg-orange' };
  if (desc.includes('investimento')) return { name: 'Investimento', icon: <TrendingUp size={20} color="var(--green-dark)" />, colorClass: 'bg-green' };
  
  // Default fallback
  if (transaction.type === 'INCOME') return { name: 'Receita', icon: <Briefcase size={20} color="var(--green-dark)" />, colorClass: 'bg-green' };
  return { name: 'Outros', icon: <ShoppingCart size={20} color="var(--gray-600)" />, colorClass: 'bg-gray' };
}

export function RecentTransactions({ transactions, onNewTransaction }: RecentTransactionsProps) {
  // Format date correctly
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '0.5rem', padding: '1.5rem' }}>
      <div className="card-title-row">
        <h3>Transações Recentes</h3>
        <a href="#transactions">
          Ver todas <ChevronRight size={16} />
        </a>
      </div>

      <div className="transaction-list">
        {transactions.map((transaction) => {
          const catMock = getCategoryMock(transaction);
          const isExpense = transaction.type === 'EXPENSE';
          
          return (
            <div key={transaction.id} className="transaction-item">
              <div className="icon-box" style={{ backgroundColor: `var(--${catMock.colorClass.split('-')[1]}-light)` }}>
                {catMock.icon}
              </div>
              
              <div className="transaction-info">
                <h4>{transaction.description}</h4>
                <span>{formatDate(transaction.date)}</span>
              </div>
              
              <div>
                <span className={`badge ${catMock.colorClass}`}>{catMock.name}</span>
              </div>
              
              <div className={`transaction-amount ${isExpense ? 'amount-expense' : 'amount-income'}`}>
                {isExpense ? '- ' : '+ '}
                R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                {isExpense ? <ArrowDownCircle size={16} color="var(--danger)" /> : <ArrowUpCircle size={16} color="var(--green-dark)" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="action-row">
        <button className="btn-new-transaction" onClick={onNewTransaction}>
          <Plus size={16} /> Nova transação
        </button>
      </div>
    </div>
  );
}
