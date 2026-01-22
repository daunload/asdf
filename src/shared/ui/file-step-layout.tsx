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
			className={cn(
				'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8',
				className,
			)}
		>
			{/* Neon Spotlight Effect */}
			<div
				className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[100px]"
				style={{
					background:
						'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)',
				}}
			/>
			<div
				className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 opacity-30 blur-[100px]"
				style={{
					background:
						'radial-gradient(circle, var(--neon-magenta) 0%, transparent 70%)',
				}}
			/>

			<main className="relative z-10 mx-auto w-full max-w-md">
				<div className="space-y-8">
					{/* Header Section */}
					<div className="text-center">
						<h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
							{title}
						</h1>
						{description && (
							<p className="mt-4 text-lg leading-8 text-zinc-400">
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
