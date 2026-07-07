import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/shared/components/ui/button';
import { 
  X, 
  Briefcase, 
  Car, 
  HeartPulse, 
  PiggyBank, 
  ShoppingCart, 
  Ticket, 
  Stethoscope, 
  Utensils,
  PawPrint,
  Home,
  Gift,
  Dumbbell,
  Book,
  ShoppingBag,
  Wallet,
  ClipboardList
} from 'lucide-react';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import type { Category } from '../types';

type EditCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
};

const ICONS = [
  { name: 'Briefcase', component: Briefcase },
  { name: 'Car', component: Car },
  { name: 'HeartPulse', component: HeartPulse },
  { name: 'PiggyBank', component: PiggyBank },
  { name: 'ShoppingCart', component: ShoppingCart },
  { name: 'Ticket', component: Ticket },
  { name: 'Stethoscope', component: Stethoscope },
  { name: 'Utensils', component: Utensils },
  { name: 'PawPrint', component: PawPrint },
  { name: 'Home', component: Home },
  { name: 'Gift', component: Gift },
  { name: 'Dumbbell', component: Dumbbell },
  { name: 'Book', component: Book },
  { name: 'ShoppingBag', component: ShoppingBag },
  { name: 'Wallet', component: Wallet },
  { name: 'ClipboardList', component: ClipboardList }
];

const COLORS = [
  '#16A34A', // green
  '#2563EB', // blue
  '#9333EA', // purple
  '#DB2777', // pink
  '#DC2626', // red
  '#EA580C', // orange
  '#CA8A04', // yellow
];

export function EditCategoryModal({ isOpen, onClose, category }: EditCategoryModalProps) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || '');
  const [selectedIcon, setSelectedIcon] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(category.colorClass || COLORS[0]);

  const { mutateAsync: updateCategory, isPending } = useUpdateCategory();

  useEffect(() => {
    if (isOpen) {
      setName(category.name);
      setDescription(category.description || '');
      setSelectedColor(category.colorClass || COLORS[0]);
      const idx = ICONS.findIndex(i => i.name === category.icon);
      setSelectedIcon(idx !== -1 ? idx : 0);
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await updateCategory({
        id: category.id,
        name,
        description: description.trim() || undefined,
        icon: ICONS[selectedIcon].name,
        colorClass: selectedColor,
      });
      onClose();
    } catch (error) {
      console.error('Failed to update category:', error);
      alert('Erro ao atualizar categoria.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <h2>Editar categoria</h2>
            <p>Altere os dados da sua categoria</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Ex. Alimentação" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Descrição da categoria" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="input-helper">Opcional</span>
          </div>

          <div className="form-group">
            <label>Ícone</label>
            <div className="icon-grid">
              {ICONS.map((iconObj, index) => {
                const Icon = iconObj.component;
                return (
                  <button 
                    key={index} 
                    className={`icon-btn ${selectedIcon === index ? 'selected' : ''}`}
                    onClick={() => setSelectedIcon(index)}
                    type="button"
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>Cor</label>
            <div className="color-list">
              {COLORS.map((color, index) => (
                <button
                  key={index}
                  className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  type="button"
                >
                  <div 
                    className="color-btn-inner" 
                    style={{ backgroundColor: color }} 
                  />
                </button>
              ))}
            </div>
          </div>

          <Button 
            type="submit"
            disabled={isPending}
            style={{ backgroundColor: 'var(--brand-base)', color: 'white', border: 'none', width: '100%', marginTop: '1rem' }}
          >
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </div>
    </div>
  );
}
