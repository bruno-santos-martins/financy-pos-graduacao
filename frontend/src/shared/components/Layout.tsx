import { ReactNode } from 'react';
import { useAuth } from '@/features/auth';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '@/shared/img/logo.png';

type LayoutProps = {
  title?: string; // no longer really used in this header, but keeping it
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <>
      <header className="dashboard-header">
        <div className="logo">
          <img src={logoImg} alt="FINANCY logo" />
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

        <Link to="/profile" className="avatar-circle" title="Perfil">
          CT
        </Link>
      </header>
      <div className="dashboard-container">
        {children}
      </div>
    </>
  );
}

