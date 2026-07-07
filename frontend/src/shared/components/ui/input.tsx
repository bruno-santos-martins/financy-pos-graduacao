import { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactNode;
  isError?: boolean;
  helper?: string;
};

export function Input({
  className,
  label,
  icon,
  isError,
  helper,
  ...props
}: InputProps) {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          className={cn(
            'input',
            icon ? 'input-with-icon' : undefined,
            isError ? 'input-error' : undefined,
            className
          )}
          {...props}
        />
      </div>
      {helper && (
        <span className={cn('input-helper', isError ? 'input-helper-error' : undefined)}>
          {helper}
        </span>
      )}
    </div>
  );
}
