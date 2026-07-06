import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../ui/card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '1rem' }}>
        <h3>Conteúdo do Card</h3>
        <p>Este é um exemplo de card.</p>
      </div>
    ),
  },
};
