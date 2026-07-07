import { RegisterForm } from '@/features/auth';
import { Card } from '@/shared/components/ui/card';
import logoImg from '@/shared/img/logo.png';

export function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-logo">
        <img src={logoImg} alt="FINANCY logo" />
      </div>
      <Card className="auth-card">
        <RegisterForm />
      </Card>
    </div>
  );
}
