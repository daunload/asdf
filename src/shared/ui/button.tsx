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
						// Default: Modern Vibrant Gradient (Violet -> Cyan)
						'bg-linear-to-r from-[#7c3aed] to-[#06b6d4] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] border border-transparent':
							variant === 'default',

						// Outline: Gradient Border Effect
						'bg-transparent text-white border border-[#06b6d4]/50 hover:border-[#06b6d4] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:bg-[#06b6d4]/10':
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
