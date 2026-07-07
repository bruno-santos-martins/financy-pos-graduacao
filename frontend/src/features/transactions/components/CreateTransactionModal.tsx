import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { X, ArrowDownCircle, ArrowUpCircle, ChevronDown } from 'lucide-react';

type CreateTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateTransactionModal({ isOpen, onClose }: CreateTransactionModalProps) {
  const [type, setType] = useState<'expense' | 'income'>('expense');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <h2>Nova transação</h2>
            <p>Registre sua despesa ou receita</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="type-selector">
          <button 
            type="button"
            className={`type-btn expense ${type === 'expense' ? 'selected' : ''}`}
            onClick={() => setType('expense')}
          >
            <ArrowDownCircle size={16} color={type === 'expense' ? 'var(--danger)' : 'var(--danger)'} />
            Despesa
          </button>
          <button 
            type="button"
            className={`type-btn income ${type === 'income' ? 'selected' : ''}`}
            onClick={() => setType('income')}
          >
            <ArrowUpCircle size={16} color={type === 'income' ? 'var(--success)' : 'var(--gray-400)'} />
            Receita
          </button>
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <input type="text" className="input" placeholder="Ex. Almoço no restaurante" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Data</label>
            <input type="date" className="input" placeholder="Selecione" />
          </div>

          <div className="form-group">
            <label>Valor</label>
            <div className="value-input-wrapper">
              <span className="value-prefix">R$</span>
              <input type="text" className="input value-input" placeholder="0,00" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Categoria</label>
          <div className="select-wrapper">
            <select className="select-input" defaultValue="">
              <option value="" disabled>Selecione</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="mercado">Mercado</option>
              <option value="salario">Salário</option>
            </select>
            <ChevronDown size={16} className="select-icon" />
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
