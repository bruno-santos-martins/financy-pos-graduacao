import { LoginForm } from '@/features/auth';
import { Card } from '@/shared/components/ui/card';

export function LoginPage() {
  return (
    <div className="page-center">
      <Card className="card" style={{ width: '100%', maxWidth: 420 }}>
        <h1 style={{ marginTop: 0 }}>Login</h1>
        <p className="muted">Entre para acessar o dashboard.</p>
        <LoginForm />
      </Card>
    </div>
  );
}
