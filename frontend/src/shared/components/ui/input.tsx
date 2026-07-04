import { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn('input', className)} {...props} />;
}
