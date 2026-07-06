import { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactNode;
  helperText?: string;
  error?: string | boolean;
};

export function Input({ className, label, icon, helperText, error, ...props }: InputProps) {
  const isError = Boolean(error);
  const helper = typeof error === 'string' ? error : helperText;

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          className={cn(
            'input',
            {
              'input-with-icon': !!icon,
              'input-error': isError,
            },
            className
          )}
          {...props}
        />
      </div>
      {helper && (
        <span className={cn('input-helper', { 'input-helper-error': isError })}>
          {helper}
        </span>
      )}
    </div>
  );
}
