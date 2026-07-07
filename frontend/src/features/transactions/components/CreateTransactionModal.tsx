import { useState, FormEvent } from 'react';
import { Button } from '@/shared/components/ui/button';
import { X, ArrowDownCircle, ArrowUpCircle, ChevronDown } from 'lucide-react';
import { useCreateTransaction } from '../hooks/useCreateTransaction';
import { useCategories } from '@/features/category/hooks/useCategories';
import type { TransactionType } from '../types';

type CreateTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateTransactionModal({ isOpen, onClose }: CreateTransactionModalProps) {
  const [type, setType] = useState<TransactionType>('EXPENSE');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();
  const { data: categories } = useCategories();

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amountStr || !date) return;

    // Convert amount from string (e.g., "150,50") to number (150.50)
    const normalizedAmount = parseFloat(amountStr.replace(',', '.'));
    if (isNaN(normalizedAmount)) return;

    try {
      await createTransaction({
        description,
        amount: normalizedAmount,
        type,
        date: new Date(date).toISOString(),
        categoryId: categoryId || undefined,
      });

      // Reset form
      setType('EXPENSE');
      setDescription('');
      setDate('');
      setAmountStr('');
      setCategoryId('');
      onClose();
    } catch (error: any) {
      console.error('Error creating transaction:', error);
      const msg = error.response?.errors?.[0]?.message || error.message || 'Erro desconhecido';
      alert(`Erro ao criar transação: ${msg}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <h2>Nova transação</h2>
            <p>Registre sua despesa ou receita</p>
          </div>
          <button className="modal-close" onClick={onClose} type="button">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="type-selector">
            <button 
              type="button"
              className={`type-btn expense ${type === 'EXPENSE' ? 'selected' : ''}`}
              onClick={() => setType('EXPENSE')}
            >
              <ArrowDownCircle size={16} color={type === 'EXPENSE' ? 'var(--danger)' : 'var(--danger)'} />
              Despesa
            </button>
            <button 
              type="button"
              className={`type-btn income ${type === 'INCOME' ? 'selected' : ''}`}
              onClick={() => setType('INCOME')}
            >
              <ArrowUpCircle size={16} color={type === 'INCOME' ? 'var(--success)' : 'var(--gray-400)'} />
              Receita
            </button>
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Ex. Almoço no restaurante" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data</label>
              <input 
                type="date" 
                className="input" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Valor</label>
              <div className="value-input-wrapper">
                <span className="value-prefix">R$</span>
                <input 
                  type="number" 
                  step="0.01"
                  className="input value-input" 
                  placeholder="0,00" 
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <div className="select-wrapper">
              <select 
                className="select-input" 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="" disabled>Selecione</option>
                {categories?.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="select-icon" />
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
