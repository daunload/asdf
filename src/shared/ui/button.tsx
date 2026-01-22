'use client';

import * as React from 'react';
import {
	Button as BaseButton,
	type ButtonProps as BaseButtonProps,
} from '@base-ui/react/button';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps extends BaseButtonProps {
	variant?: 'default' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
	children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ variant = 'default', size = 'md', className, children, ...props },
		ref,
	) => {
		return (
			<BaseButton
				ref={ref}
				className={cn(
					'inline-flex items-center justify-center rounded-md font-medium transition-colors',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
					'disabled:pointer-events-none disabled:opacity-50',
					{
						'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200':
							variant === 'default',
						'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800':
							variant === 'outline',
						'hover:bg-gray-100 dark:hover:bg-gray-800':
							variant === 'ghost',
						'h-9 px-3 text-sm': size === 'sm',
						'h-11 px-4 text-base': size === 'md',
						'h-12 px-6 text-lg': size === 'lg',
					},
					className,
				)}
				{...props}
			>
				{children}
			</BaseButton>
		);
	},
);

Button.displayName = 'Button';
