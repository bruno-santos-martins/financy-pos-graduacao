import { useState, FormEvent } from 'react';
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
import { useCreateCategory } from '../hooks/useCreateCategory';

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
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

export function CreateCategoryModal({ isOpen, onClose }: CreateCategoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);

  const { mutateAsync: createCategory, isPending } = useCreateCategory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCategory({
        name,
        description: description.trim() || undefined,
        icon: ICONS[selectedIcon].name,
        colorClass: selectedColor, // We are storing the hex code directly as requested
      });
      
      setName('');
      setDescription('');
      setSelectedIcon(0);
      setSelectedColor(COLORS[0]);
      onClose();
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Erro ao criar categoria.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <h2>Nova categoria</h2>
            <p>Organize suas transações com categorias</p>
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
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
