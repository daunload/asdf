'use client';

import * as React from 'react';
import { Input as BaseInput, type InputProps as BaseInputProps } from '@base-ui/react/input';
import { cn } from '@/shared/lib/utils';

export interface InputProps extends Omit<BaseInputProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        className={cn(
          'flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm',
          'placeholder:text-gray-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-gray-700 dark:placeholder:text-gray-500',
          {
            'h-9 text-sm': size === 'sm',
            'h-11 text-base': size === 'md',
            'h-12 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
