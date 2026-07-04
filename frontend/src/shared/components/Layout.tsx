import { ReactNode } from 'react';
import { useAuth } from '@/features/auth';
import { Button } from '@/shared/components/ui/button';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

export function Layout({ title, children }: LayoutProps) {
  const { logout } = useAuth();

  return (
    <div className="container">
      <header className="header">
        <h1 style={{ margin: 0 }}>{title}</h1>
        <Button variant="ghost" onClick={logout}>
          Sair
        </Button>
      </header>
      {children}
    </div>
  );
}
