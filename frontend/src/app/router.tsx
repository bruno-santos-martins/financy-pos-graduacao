import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/app/App';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/transactions',
    element: <TransactionsPage />,
  },
  {
    path: '/categories',
    element: <CategoriesPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);
