import { LabelHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return <label className={cn('label', className)} {...props} />;
}