import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils'; // Assuming tailwind-merge utils exist, if not I'll just use template literal or simple join

interface StepLayoutProps {
	title: string;
	description?: string;
	children: ReactNode;
	footer?: ReactNode;
	className?: string; // Standard prop for overrides
}

export function StepLayout({
	title,
	description,
	children,
	footer,
	className,
}: StepLayoutProps) {
	return (
		<div
			className={
				/* cn uses clsx + tailwind-merge ideally, but standard string concat for now if utils not confirmed */
				`flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8 ${className || ''}`
			}
		>
			<main className="mx-auto w-full max-w-md">
				<div className="space-y-8">
					{/* Header Section */}
					<div className="text-center">
						<h1 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
							{title}
						</h1>
						{description && (
							<p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
								{description}
							</p>
						)}
					</div>

					{/* Main Content */}
					<div>{children}</div>

					{/* Footer/Actions */}
					{footer && (
						<div className="flex justify-center pt-4">{footer}</div>
					)}
				</div>
			</main>
		</div>
	);
}
