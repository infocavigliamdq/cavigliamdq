import * as React from 'react';
import { cn } from '../../Utils/utils';

const buttonVariants = {
  default: 'bg-primary text-white hover:bg-primary/90',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof buttonVariants;
    size?: 'sm' | 'default';
  }
>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        buttonVariants[variant],
        size === 'sm' ? 'h-8 px-3' : 'h-10 px-4 py-2',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';
