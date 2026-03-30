import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
  removable?: boolean;
  onRemove?: () => void;
}

export function Badge({ children, variant = 'default', className, removable, onRemove }: BadgeProps) {
  const variants: Record<string, string> = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border-secondary',
    outline: 'bg-transparent border-border text-foreground',
    destructive: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:text-red-500 transition-colors cursor-pointer"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
}
