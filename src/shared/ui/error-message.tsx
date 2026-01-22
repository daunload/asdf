import { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';

interface ErrorMessageProps {
	title?: string;
	message: string;
	retry?: () => void;
	retryLabel?: string;
	secondaryAction?: ReactNode; // e.g. "Go back home" button
	className?: string;
}

export function ErrorMessage({
	title = '오류가 발생했습니다',
	message,
	retry,
	retryLabel = '다시 시도',
	secondaryAction,
	className = '',
}: ErrorMessageProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center text-center ${className}`}
		>
			<h2 className="text-xl font-semibold text-black dark:text-zinc-50">
				{title}
			</h2>
			<p
				className="mt-2 text-base text-zinc-600 dark:text-zinc-400"
				role="alert"
			>
				{message}
			</p>
			<div className="mt-6 flex flex-col gap-3 sm:flex-row">
				{retry && (
					<Button
						onClick={retry}
						size="lg"
						variant="default"
						className="min-h-[44px] min-w-[120px]"
					>
						{retryLabel}
					</Button>
				)}
				{secondaryAction}
			</div>
		</div>
	);
}
