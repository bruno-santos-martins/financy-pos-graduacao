import { Layout } from '@/shared/components/Layout';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { 
  Search, 
  Utensils, 
  Car, 
  ShoppingCart, 
  TrendingUp, 
  Home, 
  Briefcase, 
  Film,
  ArrowDownCircle,
  ArrowUpCircle,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { CreateTransactionModal } from '@/features/transactions';

const mockTransactions = [
  {
    id: '1',
    description: 'Jantar no Restaurante',
    date: '30/11/25',
    category: 'Alimentação',
    categoryColor: 'bg-blue',
    icon: <Utensils size={20} color="var(--blue-dark)" />,
    type: 'Saída',
    value: '- R$ 89,50'
  },
  {
    id: '2',
    description: 'Posto de Gasolina',
    date: '29/11/25',
    category: 'Transporte',
    categoryColor: 'bg-purple',
    icon: <Car size={20} color="var(--purple-dark)" />,
    type: 'Saída',
    value: '- R$ 100,00'
  },
  {
    id: '3',
    description: 'Compras no Mercado',
    date: '28/11/25',
    category: 'Mercado',
    categoryColor: 'bg-orange',
    icon: <ShoppingCart size={20} color="var(--orange-dark)" />,
    type: 'Saída',
    value: '- R$ 156,80'
  },
  {
    id: '4',
    description: 'Retorno de Investimento',
    date: '26/11/25',
    category: 'Investimento',
    categoryColor: 'bg-green',
    icon: <TrendingUp size={20} color="var(--green-dark)" />,
    type: 'Entrada',
    value: '+ R$ 340,25'
  },
  {
    id: '5',
    description: 'Aluguel',
    date: '26/11/25',
    category: 'Utilidades',
    categoryColor: 'bg-yellow',
    icon: <Home size={20} color="var(--yellow-dark)" />,
    type: 'Saída',
    value: '- R$ 1.700,00'
  },
  {
    id: '6',
    description: 'Freelance',
    date: '24/11/25',
    category: 'Salário',
    categoryColor: 'bg-green',
    icon: <Briefcase size={20} color="var(--green-dark)" />,
    type: 'Entrada',
    value: '+ R$ 2.500,00'
  },
  {
    id: '7',
    description: 'Compras Jantar',
    date: '22/11/25',
    category: 'Mercado',
    categoryColor: 'bg-orange',
    icon: <ShoppingCart size={20} color="var(--orange-dark)" />,
    type: 'Saída',
    value: '- R$ 150,00'
  },
  {
    id: '8',
    description: 'Cinema',
    date: '18/12/25',
    category: 'Entretenimento',
    categoryColor: 'bg-pink',
    icon: <Film size={20} color="var(--pink-dark)" />,
    type: 'Saída',
    value: '- R$ 88,00'
  }
];

export function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalItems = mockTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mockTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  return (
    <Layout>
      <div className="transactions-header">
        <div className="transactions-title">
          <h1>Transações</h1>
          <p>Gerencie todas as suas transações financeiras</p>
        </div>
        <Button variant="brand" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} style={{ marginRight: '0.5rem' }} />
          Nova transação
        </Button>
      </div>

      <div className="filters-card">
        <div className="filters-grid">
          <div className="input-wrapper">
            <Label className="input-label">Buscar</Label>
            <div className="input-container">
              <div className="input-icon">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                className="input" 
                placeholder="Buscar por descrição" 
                style={{ paddingLeft: '2.5rem' }} 
              />
            </div>
          </div>

          <div className="input-wrapper">
            <Label className="input-label">Tipo</Label>
            <select className="filter-select">
              <option value="all">Todos</option>
              <option value="income">Entrada</option>
              <option value="expense">Saída</option>
            </select>
          </div>

          <div className="input-wrapper">
            <Label className="input-label">Categoria</Label>
            <select className="filter-select">
              <option value="all">Todas</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="mercado">Mercado</option>
            </select>
          </div>

          <div className="input-wrapper">
            <Label className="input-label">Período</Label>
            <select className="filter-select">
              <option value="nov2025">Novembro / 2025</option>
              <option value="dez2025">Dezembro / 2025</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-card">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>DESCRIÇÃO</th>
              <th>DATA</th>
              <th>CATEGORIA</th>
              <th>TIPO</th>
              <th>VALOR</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((tx) => (
              <tr key={tx.id}>
                <td>
                  <div className="table-desc">
                    <div className={`table-icon-wrapper ${tx.categoryColor}`}>
                      {tx.icon}
                    </div>
                    {tx.description}
                  </div>
                </td>
                <td>{tx.date}</td>
                <td>
                  <span className={`badge ${tx.categoryColor}`}>
                    {tx.category}
                  </span>
                </td>
                <td>
                  <div className={`table-type ${tx.type === 'Saída' ? 'saida' : 'entrada'}`}>
                    {tx.type === 'Saída' ? (
                      <ArrowDownCircle size={16} />
                    ) : (
                      <ArrowUpCircle size={16} />
                    )}
                    {tx.type}
                  </div>
                </td>
                <td>
                  <span className={`table-value ${tx.type === 'Saída' ? 'amount-expense' : 'amount-income'}`}>
                    {tx.value}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="action-btn delete" title="Excluir">
                      <Trash2 size={16} />
                    </button>
                    <button className="action-btn edit" title="Editar">
                      <Edit2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <div className="table-footer-info">
            {totalItems > 0 ? startIndex + 1 : 0} a {Math.min(startIndex + itemsPerPage, totalItems)} | {totalItems} resultados
          </div>
          <div className="pagination">
            <button className="page-btn" disabled={currentPage === 1} onClick={handlePrevPage}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button 
                  key={page} 
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button className="page-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={handleNextPage}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <CreateTransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}
