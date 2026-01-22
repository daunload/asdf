import { ReactNode } from 'react';

interface SpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	label?: string;
	className?: string;
	children?: ReactNode; // Optional additional content (like text below spinner)
}

const sizeClasses = {
	sm: 'h-6 w-6 border-2',
	md: 'h-8 w-8 border-3',
	lg: 'h-12 w-12 border-4',
};

export function Spinner({
	size = 'lg',
	label = '로딩 중',
	className = '',
	children,
}: SpinnerProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center ${className}`}
		>
			<div
				className={`${sizeClasses[size]} animate-spin rounded-full border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white`}
				role="status"
				aria-label={label}
			>
				<span className="sr-only">{label}...</span>
			</div>
			{children && <div className="mt-4">{children}</div>}
		</div>
	);
}
