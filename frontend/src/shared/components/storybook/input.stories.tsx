import type { Meta, StoryObj } from '@storybook/react';
import { Mail } from 'lucide-react';
import { Input } from '../ui/input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    icon: <Mail size={16} />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    error: 'A senha deve conter no mínimo 6 caracteres',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    placeholder: 'Desabilitado',
    disabled: true,
  },
};
