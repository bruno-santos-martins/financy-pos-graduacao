import { LoginForm } from '@/features/auth';
import { CircleDollarSign } from 'lucide-react';
import { Card } from '@/shared/components/ui/card';

import logoImg from '@/shared/img/logo.png';

export function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-logo">
        <img src={logoImg} alt="FINANCY logo" />
      </div>
      <Card className="auth-card">
        <LoginForm />
      </Card>
    </div>
  );
}
