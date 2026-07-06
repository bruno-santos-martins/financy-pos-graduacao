import { ReactNode } from 'react';
import { useAuth } from '@/features/auth';
import { Link, useLocation } from 'react-router-dom';
import { CircleDollarSign } from 'lucide-react';

type LayoutProps = {
  title?: string; // no longer really used in this header, but keeping it
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <>
      <header className="dashboard-header">
        <div className="logo">
          <CircleDollarSign color="var(--brand-base)" size={24} />
          <span>FINANCY</span>
        </div>

        <nav className="dashboard-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/transactions" className={location.pathname === '/transactions' ? 'active' : ''}>
            Transações
          </Link>
          <Link to="/categories" className={location.pathname === '/categories' ? 'active' : ''}>
            Categorias
          </Link>
        </nav>

        <div className="avatar-circle" onClick={logout} style={{ cursor: 'pointer' }} title="Sair">
          CT
        </div>
      </header>
      <div className="dashboard-container">
        {children}
      </div>
    </>
  );
}

