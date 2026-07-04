import { Card } from '@/shared/components/ui/card';

type SummaryCardProps = {
  title: string;
  value: number;
};

export function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <Card style={{ flex: 1, minWidth: 180 }}>
      <p className="muted" style={{ marginTop: 0 }}>
        {title}
      </p>
      <h2 style={{ marginBottom: 0 }}>R$ {value.toFixed(2)}</h2>
    </Card>
  );
}
