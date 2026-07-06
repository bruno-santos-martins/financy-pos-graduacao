import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from '../Layout';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </QueryClientProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Página Inicial',
    children: (
      <div style={{ padding: '2rem' }}>
        <h1>Conteúdo da Página</h1>
        <p>Bem-vindo ao layout padrão.</p>
      </div>
    ),
  },
};
