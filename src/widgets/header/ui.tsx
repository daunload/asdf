'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const isLoading = status === 'loading';
	const isAuthenticated = !!session;

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/' });
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-sm">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* 로고/홈 링크 */}
				<Link href="/" className="flex items-center space-x-2">
					<span className="text-xl font-semibold text-white">
						natalchart
					</span>
				</Link>

				{/* 네비게이션 */}
				<nav className="flex items-center space-x-4">
					{isLoading ? (
						<div className="h-9 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
					) : isAuthenticated ? (
						<>
							{/* 로그인된 사용자 */}
							<span className="text-sm text-zinc-300">
								{session.user?.name ||
									session.user?.email ||
									'사용자'}
							</span>
							<Button
								onClick={handleSignOut}
								size="sm"
								variant="ghost"
								className="min-h-[36px] text-white hover:bg-white/10"
							>
								로그아웃
							</Button>
						</>
					) : (
						<>
							{/* 비로그인 사용자 */}
							<Link href="/auth/login">
								<Button
									size="sm"
									variant="default"
									className="min-h-[36px]"
								>
									로그인
								</Button>
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}
