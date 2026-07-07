import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from './button';

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
};

export function AlertModal({ isOpen, onClose, title, message, type = 'error' }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '400px', padding: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
          {type === 'success' ? (
            <CheckCircle size={48} color="var(--success)" />
          ) : (
            <AlertTriangle size={48} color="var(--danger)" />
          )}
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--gray-700)', margin: 0 }}>
            {title}
          </h2>
          
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
            {message}
          </p>

          <Button 
            variant="brand" 
            onClick={onClose} 
            style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}
