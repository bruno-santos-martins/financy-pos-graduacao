import { Layout } from '@/shared/components/Layout';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { 
  Search, 
  ArrowDownCircle,
  ArrowUpCircle,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { CreateTransactionModal, useTransactions } from '@/features/transactions';
import { useCategories } from '@/features/category';
import * as Icons from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

export function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const { data: transactions = [], isLoading } = useTransactions();
  const { data: categories = [] } = useCategories();

  // Apply Filters
  const filteredTransactions = transactions.filter((tx) => {
    // Search
    if (search && !tx.description.toLowerCase().includes(search.toLowerCase())) return false;
    
    // Type
    if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
    
    // Category
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'none') {
        if (tx.categoryId) return false;
      } else {
        if (tx.categoryId !== categoryFilter) return false;
      }
    }
    
    return true;
  });

  const itemsPerPage = 6;
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Make sure current page is valid when filtering reduces items
  const validCurrentPage = Math.min(currentPage, totalPages);
  
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const currentItems = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (validCurrentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (validCurrentPage < totalPages) setCurrentPage(p => p + 1);
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
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>

          <div className="input-wrapper">
            <Label className="input-label">Tipo</Label>
            <select 
              className="filter-select" 
              value={typeFilter} 
              onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">Todos</option>
              <option value="INCOME">Entrada</option>
              <option value="EXPENSE">Saída</option>
            </select>
          </div>

          <div className="input-wrapper">
            <Label className="input-label">Categoria</Label>
            <select 
              className="filter-select" 
              value={categoryFilter} 
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">Todas</option>
              <option value="none">Sem Categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="input-wrapper">
            <Label className="input-label">Período</Label>
            <select className="filter-select" disabled>
              <option value="all">Todos os períodos</option>
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
            {isLoading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Carregando...</td></tr>
            ) : currentItems.map((tx) => {
              const category = categories.find(c => c.id === tx.categoryId);
              // Provide a default icon/color if no category is found
              const IconName = category?.icon || 'Tag';
              const IconComp = (Icons as any)[IconName] || Icons.Tag;
              const color = category?.colorClass || '#71717A'; // default gray

              return (
              <tr key={tx.id}>
                <td>
                  <div className="table-desc">
                    <div className="table-icon-wrapper" style={{ backgroundColor: color }}>
                      <IconComp size={20} color="white" />
                    </div>
                    {tx.description}
                  </div>
                </td>
                <td>{formatDate(tx.date)}</td>
                <td>
                  {category ? (
                    <span className="badge" style={{ backgroundColor: `${color}20`, color: color }}>
                      {category.name}
                    </span>
                  ) : (
                    <span className="badge" style={{ backgroundColor: '#f4f4f5', color: '#71717A' }}>
                      Sem Categoria
                    </span>
                  )}
                </td>
                <td>
                  <div className={`table-type ${tx.type === 'EXPENSE' ? 'saida' : 'entrada'}`}>
                    {tx.type === 'EXPENSE' ? (
                      <ArrowDownCircle size={16} />
                    ) : (
                      <ArrowUpCircle size={16} />
                    )}
                    {tx.type === 'EXPENSE' ? 'Saída' : 'Entrada'}
                  </div>
                </td>
                <td>
                  <span className={`table-value ${tx.type === 'EXPENSE' ? 'amount-expense' : 'amount-income'}`}>
                    {tx.type === 'EXPENSE' ? '- ' : '+ '}
                    {formatCurrency(tx.amount)}
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
            )})}
          </tbody>
        </table>

        <div className="table-footer">
          <div className="table-footer-info">
            {totalItems > 0 ? startIndex + 1 : 0} a {Math.min(startIndex + itemsPerPage, totalItems)} | {totalItems} resultados
          </div>
          <div className="pagination">
            <button className="page-btn" disabled={validCurrentPage === 1} onClick={handlePrevPage}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button 
                  key={page} 
                  className={`page-btn ${validCurrentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button className="page-btn" disabled={validCurrentPage === totalPages || totalPages === 0} onClick={handleNextPage}>
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
