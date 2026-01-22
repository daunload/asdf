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
					'relative inline-flex items-center justify-center rounded-md font-bold transition-all duration-300',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neon-lime',
					'disabled:pointer-events-none disabled:opacity-50',
					{
						// Default: Celestial Gradient Background + Glow
						'bg-linear-to-r from-celestial-violet to-celestial-blue text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95':
							variant === 'default',

						// Outline: Gradient Border Effect
						'bg-transparent text-white border border-celestial-blue/50 hover:border-celestial-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:bg-celestial-blue/10':
							variant === 'outline',

						// Ghost: Simple hover
						'hover:bg-white/10 text-white': variant === 'ghost',

						'h-9 px-4 text-sm': size === 'sm',
						'h-11 px-6 text-base': size === 'md',
						'h-14 px-8 text-lg': size === 'lg',
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
