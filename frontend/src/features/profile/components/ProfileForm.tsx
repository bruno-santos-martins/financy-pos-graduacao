import { User, Mail, LogOut } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { useAuth } from '@/features/auth';
import { useNavigate } from 'react-router-dom';

export function ProfileForm() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar-large">
          CT
        </div>
        <h2 className="profile-name">Conta teste</h2>
        <p className="profile-email">conta@teste.com</p>
      </div>

      <form className="profile-form">
        <Input 
          label="Nome completo"
          icon={<User size={18} />}
          defaultValue="Conta teste"
        />

        <Input 
          label="E-mail"
          icon={<Mail size={18} />}
          defaultValue="conta@teste.com"
          disabled
          helper="O e-mail não pode ser alterado"
        />

        <div className="profile-actions">
          <button type="button" className="btn-brand btn-full">
            Salvar alterações
          </button>
          <button 
            type="button" 
            className="btn-danger-outline btn-full" 
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <LogOut size={18} />
            Sair da conta
          </button>
        </div>
      </form>
    </div>
  );
}
