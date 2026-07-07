import { useState } from 'react';
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

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ICONS = [
  Briefcase, Car, HeartPulse, PiggyBank, ShoppingCart, Ticket, Stethoscope, Utensils,
  PawPrint, Home, Gift, Dumbbell, Book, ShoppingBag, Wallet, ClipboardList
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
  const [selectedIcon, setSelectedIcon] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);

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

        <div className="form-group">
          <label>Título</label>
          <input type="text" className="input" placeholder="Ex. Alimentação" />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <input type="text" className="input" placeholder="Descrição da categoria" />
          <span className="input-helper">Opcional</span>
        </div>

        <div className="form-group">
          <label>Ícone</label>
          <div className="icon-grid">
            {ICONS.map((Icon, index) => (
              <button 
                key={index} 
                className={`icon-btn ${selectedIcon === index ? 'selected' : ''}`}
                onClick={() => setSelectedIcon(index)}
                type="button"
              >
                <Icon size={18} />
              </button>
            ))}
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
          style={{ backgroundColor: 'var(--brand-base)', color: 'white', border: 'none', width: '100%', marginTop: '1rem' }}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
