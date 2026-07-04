import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost';
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn('btn', variant === 'default' ? 'btn-primary' : 'btn-ghost', className)}
      {...props}
    />
  );
}
