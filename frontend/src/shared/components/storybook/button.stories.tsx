import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../ui/button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Confirmar',
    variant: 'default',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Cancelar',
    variant: 'ghost',
  },
};
