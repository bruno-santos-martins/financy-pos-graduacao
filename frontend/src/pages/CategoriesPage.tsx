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
  Plus,
  PawPrint,
  Gift,
  Dumbbell,
  Book,
  ShoppingBag,
  Wallet,
  ClipboardList
} from 'lucide-react';
import { useState } from 'react';
import { CreateCategoryModal, EditCategoryModal, useCategories, useDeleteCategory } from '@/features/category';
import type { Category } from '@/features/category/types';

const ICON_MAP: Record<string, any> = {
  Briefcase, Car, HeartPulse, PiggyBank, ShoppingCart, Ticket, Utensils,
  PawPrint, Home, Gift, Dumbbell, Book, ShoppingBag, Wallet, ClipboardList
};

export function CategoriesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  
  const { data: categories, isLoading } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${name}"?`)) {
      deleteCategory(id);
    }
  };

  const totalCategories = categories?.length || 0;

  return (
    <Layout>
      <div className="categories-header">
        <div className="categories-title">
          <h1>Categorias</h1>
          <p>Organize suas transações por categorias</p>
        </div>
        <Button 
          variant="brand"
          onClick={() => setIsCreateModalOpen(true)}
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
            <span className="summary-value">{totalCategories}</span>
            <span className="summary-label">TOTAL DE CATEGORIAS</span>
          </div>
        </div>

        <div className="category-summary-card">
          <div className="summary-icon-box" style={{ color: 'var(--purple-base)' }}>
            <ArrowDownUp size={28} />
          </div>
          <div className="summary-info">
            <span className="summary-value">0</span>
            <span className="summary-label">TOTAL DE TRANSAÇÕES</span>
          </div>
        </div>

        <div className="category-summary-card">
          <div className="summary-icon-box" style={{ color: 'var(--blue-base)' }}>
            <Utensils size={28} />
          </div>
          <div className="summary-info">
            <span className="summary-value">-</span>
            <span className="summary-label">CATEGORIA MAIS UTILIZADA</span>
          </div>
        </div>
      </div>

      <div className="categories-grid">
        {isLoading && <p>Carregando categorias...</p>}
        {categories?.map((category) => {
          const IconComponent = ICON_MAP[category.icon] || Tag;
          
          return (
            <div className="category-card" key={category.id}>
              <div className="category-card-header">
                <div 
                  className="category-card-icon"
                  style={{ backgroundColor: category.colorClass, color: 'white', opacity: 0.9 }}
                >
                  <IconComponent size={24} />
                </div>
                <div className="category-card-actions">
                  <button className="action-btn delete" title="Excluir" onClick={() => handleDelete(category.id, category.name)}>
                    <Trash2 size={16} />
                  </button>
                  <button className="action-btn edit" title="Editar" onClick={() => setCategoryToEdit(category as Category)}>
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="category-card-body">
                <h3 className="category-card-title">{category.name}</h3>
                {category.description && <p className="category-card-desc">{category.description}</p>}
              </div>
              
              <div className="category-card-footer">
                <span className="badge" style={{ backgroundColor: category.colorClass, color: 'white' }}>
                  {category.name}
                </span>
                <span className="category-card-count">
                  0 itens
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <CreateCategoryModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      {categoryToEdit && (
        <EditCategoryModal
          isOpen={!!categoryToEdit}
          onClose={() => setCategoryToEdit(null)}
          category={categoryToEdit}
        />
      )}
    </Layout>
  );
}
