import { Card } from '@/shared/components/ui/card';
import type { Transaction } from '@/shared/types';

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <h3 style={{ marginTop: 0 }}>Transações recentes</h3>
      <div className="stack">
        {transactions.map((transaction) => (
          <div key={transaction.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{transaction.description}</span>
            <strong>
              {transaction.type === 'EXPENSE' ? '-' : '+'} R$ {transaction.amount.toFixed(2)}
            </strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
