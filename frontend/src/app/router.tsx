import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/app/App';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { CategoriesPage } from '@/pages/CategoriesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/transactions',
    element: <TransactionsPage />,
  },
  {
    path: '/categories',
    element: <CategoriesPage />,
  },
]);
