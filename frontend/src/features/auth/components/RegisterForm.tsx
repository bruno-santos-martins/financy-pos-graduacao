import { FormEvent, useState } from 'react';
import { User, Mail, Lock, EyeOff, Eye, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/shared/components/ui/input';
import { authService } from '@/features/auth/services/authService';

export function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.register({ name, email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h2>Criar conta</h2>
        <p>Comece a controlar suas finanças ainda hoje</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          label="Nome completo"
          placeholder="Seu nome completo"
          icon={<User size={18} />}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="mail@exemplo.com"
          icon={<Mail size={18} />}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <div className="password-input-group">
          <Input
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            icon={<Lock size={18} />}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            helper="A senha deve ter no mínimo 8 caracteres"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="btn-brand btn-full" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <div className="auth-footer">
          <p>Já tem uma conta?</p>
          <Link to="/login" className="btn-outline btn-full" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogIn size={18} style={{ marginRight: '8px' }} />
            Fazer login
          </Link>
        </div>
      </form>
    </div>
  );
}
