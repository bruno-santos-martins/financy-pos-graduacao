import { ChevronRight } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';

type CategoryItem = {
  id: string;
  name: string;
  count: number;
  amount: number;
  colorClass: string;
};

// Mock data based on the screenshot
const mockCategories: CategoryItem[] = [
  { id: '1', name: 'Alimentação', count: 12, amount: 542.3, colorClass: 'bg-blue' },
  { id: '2', name: 'Transporte', count: 8, amount: 385.5, colorClass: 'bg-purple' },
  { id: '3', name: 'Mercado', count: 3, amount: 298.75, colorClass: 'bg-orange' },
  { id: '4', name: 'Entretenimento', count: 2, amount: 186.2, colorClass: 'bg-pink' },
  { id: '5', name: 'Utilidades', count: 7, amount: 245.8, colorClass: 'bg-yellow' },
];

export function CategoriesList() {
  return (
    <Card style={{ padding: '1.5rem', background: 'var(--white)', borderRadius: '0.5rem', border: '1px solid var(--gray-200)' }}>
      <div className="card-title-row">
        <h3>Categorias</h3>
        <a href="#manage">
          Gerenciar <ChevronRight size={16} />
        </a>
      </div>

      <div className="category-list">
        {mockCategories.map((cat) => (
          <div key={cat.id} className="category-item">
            <div className="category-item-info">
              <span className={`badge ${cat.colorClass}`}>{cat.name}</span>
            </div>
            <span className="category-item-count">{cat.count} itens</span>
            <span className="category-item-amount">
              R$ {cat.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
