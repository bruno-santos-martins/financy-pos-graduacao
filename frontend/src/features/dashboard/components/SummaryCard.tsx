import { ReactNode } from 'react';

type SummaryCardProps = {
  title: string;
  value: number;
  icon?: ReactNode;
};

export function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <div className="summary-card">
      <div className="summary-card-header">
        {icon}
        {title}
      </div>
      <h2 className="summary-card-value">
        R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h2>
    </div>
  );
}
