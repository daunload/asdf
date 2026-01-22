'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export function Header() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const isLoading = status === 'loading';
	const isAuthenticated = !!session;
	const isCardsPage = pathname === '/cards';

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/' });
	};

	const handleSaveAnalysis = () => {
		// Save analysis functionality
		console.log('Save analysis');
	};

	return (
		<header className="w-full border-b border-solid border-white/10 px-6 py-4 sticky top-0 z-50 glass-effect">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="text-accent-gold">
						<span className="material-symbols-outlined text-3xl">
							auto_awesome
						</span>
					</div>
					<h2 className="text-white text-xl font-extrabold tracking-tight">
						<Link href="/">CosmicAI</Link>
					</h2>
				</div>
				<nav className="hidden md:flex flex-1 justify-center gap-10">
					<Link
						className="text-white/80 hover:text-accent-gold text-sm font-medium transition-colors"
						href="/analysis"
					>
						Birth Charts
					</Link>
					<Link
						className="text-white/80 hover:text-accent-gold text-sm font-medium transition-colors"
						href="#"
					>
						Transit Reports
					</Link>
					<Link
						className="text-white/80 hover:text-accent-gold text-sm font-medium transition-colors"
						href="#"
					>
						Compatibility
					</Link>
					<Link
						className="text-white/80 hover:text-accent-gold text-sm font-medium transition-colors"
						href="#"
					>
						About
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					{isCardsPage ? (
						<button
							onClick={handleSaveAnalysis}
							className="rounded-md bg-[#2A2D38] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3A3D48]"
						>
							Save Analysis
						</button>
					) : (
						<>
							{isLoading ? (
								<div className="h-9 w-20 animate-pulse rounded-md bg-white/10" />
							) : isAuthenticated ? (
								<>
									<span className="text-sm text-white/60 hidden sm:inline-block">
										{session.user?.name ||
											session.user?.email ||
											'User'}
									</span>
									<button
										onClick={handleSignOut}
										className="text-white text-sm font-medium px-4 py-2 hover:text-white/80 transition-colors"
									>
										로그아웃
									</button>
								</>
							) : (
								<>
									<Link
										href="/auth/login"
										className="text-white text-sm font-medium px-4 py-2"
									>
										로그인
									</Link>
									<button className="bg-linear-to-r from-[#7c3aed] to-[#06b6d4] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-white text-sm font-bold px-6 py-2 rounded-lg shadow-lg">
										시작하기
									</button>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</header>
	);
}
