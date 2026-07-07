import { Layout } from '@/shared/components/Layout';
import { Button } from '@/shared/components/ui/button';
import { 
  Tag,
  ArrowDownUp,
  Utensils,
  Ticket,
  PiggyBank,
  ShoppingCart,
  Briefcase,
  HeartPulse,
  Car,
  Home,
  Trash2,
  Edit2,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { CreateCategoryModal } from '@/features/category';

const mockCategories = [
  {
    id: '1',
    name: 'Alimentação',
    description: 'Restaurantes, delivery e refeições',
    colorClass: 'bg-blue',
    icon: <Utensils size={24} color="var(--blue-dark)" />,
    itemsCount: 12
  },
  {
    id: '2',
    name: 'Entretenimento',
    description: 'Cinema, jogos e lazer',
    colorClass: 'bg-pink',
    icon: <Ticket size={24} color="var(--pink-dark)" />,
    itemsCount: 2
  },
  {
    id: '3',
    name: 'Investimento',
    description: 'Aplicações e retornos financeiros',
    colorClass: 'bg-green',
    icon: <PiggyBank size={24} color="var(--green-dark)" />,
    itemsCount: 1
  },
  {
    id: '4',
    name: 'Mercado',
    description: 'Compras de supermercado e mantimentos',
    colorClass: 'bg-orange',
    icon: <ShoppingCart size={24} color="var(--orange-dark)" />,
    itemsCount: 3
  },
  {
    id: '5',
    name: 'Salário',
    description: 'Renda mensal e bonificações',
    colorClass: 'bg-green',
    icon: <Briefcase size={24} color="var(--green-dark)" />,
    itemsCount: 3
  },
  {
    id: '6',
    name: 'Saúde',
    description: 'Medicamentos, consultas e exames',
    colorClass: 'bg-red',
    icon: <HeartPulse size={24} color="var(--red-dark)" />,
    itemsCount: 0
  },
  {
    id: '7',
    name: 'Transporte',
    description: 'Gasolina, transporte público e viagens',
    colorClass: 'bg-purple',
    icon: <Car size={24} color="var(--purple-dark)" />,
    itemsCount: 8
  },
  {
    id: '8',
    name: 'Utilidades',
    description: 'Energia, água, internet e telefone',
    colorClass: 'bg-yellow',
    icon: <Home size={24} color="var(--yellow-dark)" />,
    itemsCount: 7
  }
];

export function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <div className="categories-header">
        <div className="categories-title">
          <h1>Categorias</h1>
          <p>Organize suas transações por categorias</p>
        </div>
        <Button 
          variant="brand"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} style={{ marginRight: '0.5rem' }} />
          Nova categoria
        </Button>
      </div>

      <div className="categories-summary-grid">
        <div className="category-summary-card">
          <div className="summary-icon-box" style={{ color: 'var(--gray-800)' }}>
            <Tag size={28} />
          </div>
          <div className="summary-info">
            <span className="summary-value">8</span>
            <span className="summary-label">TOTAL DE CATEGORIAS</span>
          </div>
        </div>

        <div className="category-summary-card">
          <div className="summary-icon-box" style={{ color: 'var(--purple-base)' }}>
            <ArrowDownUp size={28} />
          </div>
          <div className="summary-info">
            <span className="summary-value">27</span>
            <span className="summary-label">TOTAL DE TRANSAÇÕES</span>
          </div>
        </div>

        <div className="category-summary-card">
          <div className="summary-icon-box" style={{ color: 'var(--blue-base)' }}>
            <Utensils size={28} />
          </div>
          <div className="summary-info">
            <span className="summary-value">Alimentação</span>
            <span className="summary-label">CATEGORIA MAIS UTILIZADA</span>
          </div>
        </div>
      </div>

      <div className="categories-grid">
        {mockCategories.map((category) => (
          <div className="category-card" key={category.id}>
            <div className="category-card-header">
              <div className={`category-card-icon ${category.colorClass}`}>
                {category.icon}
              </div>
              <div className="category-card-actions">
                <button className="action-btn delete" title="Excluir">
                  <Trash2 size={16} />
                </button>
                <button className="action-btn edit" title="Editar">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="category-card-body">
              <h3 className="category-card-title">{category.name}</h3>
              <p className="category-card-desc">{category.description}</p>
            </div>
            
            <div className="category-card-footer">
              <span className={`badge ${category.colorClass}`}>
                {category.name}
              </span>
              <span className="category-card-count">
                {category.itemsCount} {category.itemsCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <CreateCategoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </Layout>
  );
}
