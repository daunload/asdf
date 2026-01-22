'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, type CardData, LockedCard } from '@/entities/card/ui';
import { Button } from '@/shared/ui/button';
import { freeTopics, paidTopics, getTopicById } from '@/shared/config/topics';

interface CardsResponse {
	cards: CardData[];
}

export function CardsPage() {
	const router = useRouter();
	const [cards, setCards] = useState<CardData[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<{
		message: string;
		code?: string;
		retry?: boolean;
	} | null>(null);

	// 카드 데이터 가져오기
	useEffect(() => {
		async function fetchCards() {
			setIsLoading(true);
			setError(null);

			try {
				// 무료 주제 ID 배열
				const freeTopicIds = freeTopics.map((topic) => topic.id);

				// /api/cards 호출
				const response = await fetch('/api/cards', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						topicIds: freeTopicIds,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					throw new Error(
						errorData.error ||
							'카드를 불러오는 중 오류가 발생했습니다.',
					);
				}

				const data: CardsResponse = await response.json();
				setCards(data.cards || []);
				setCurrentIndex(0);
			} catch (err: any) {
				console.error('카드 로딩 오류:', err);
				setError({
					message:
						err.message ||
						'카드를 불러오는 중 오류가 발생했습니다.',
					code: 'CARDS_LOAD_ERROR',
					retry: true,
				});
			} finally {
				setIsLoading(false);
			}
		}

		fetchCards();
	}, []);

	// 다음 카드로 이동 (무료 카드 + 잠금 카드 포함)
	const handleNext = useCallback(() => {
		const totalCards = cards.length + paidTopics.length;
		if (currentIndex < totalCards - 1) {
			setCurrentIndex((prev) => prev + 1);
		}
	}, [currentIndex, cards.length]);

	// 재시도
	const handleRetry = useCallback(() => {
		window.location.reload();
	}, []);

	// 해금 버튼 클릭 처리 (로그인 페이지로 이동)
	const handleUnlock = useCallback(() => {
		// 로그인 페이지로 이동 (현재 페이지 URL을 callbackUrl로 전달)
		const currentUrl = window.location.pathname + window.location.search;
		router.push(
			`/auth/login?callbackUrl=${encodeURIComponent(currentUrl)}`,
		);
	}, [router]);

	// 로딩 상태
	if (isLoading) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md text-center">
					<div className="space-y-8">
						{/* 스피너 */}
						<div className="flex justify-center">
							<div
								className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white"
								role="status"
								aria-label="로딩 중"
							>
								<span className="sr-only">로딩 중...</span>
							</div>
						</div>

						{/* 진행 문구 */}
						<div className="space-y-2">
							<h2 className="text-xl font-semibold text-black dark:text-zinc-50">
								해석을 만들고 있어요
							</h2>
							<p className="text-base text-zinc-600 dark:text-zinc-400">
								출생차트를 계산하고 카드를 생성하는 중입니다...
							</p>
						</div>
					</div>
				</main>
			</div>
		);
	}

	// 에러 상태
	if (error) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md text-center">
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-black dark:text-zinc-50">
							오류가 발생했습니다
						</h2>
						<p
							className="text-base text-zinc-600 dark:text-zinc-400"
							role="alert"
						>
							{error.message}
						</p>
						{error.retry && (
							<Button
								onClick={handleRetry}
								size="lg"
								variant="default"
								className="min-h-[44px] min-w-[120px]"
							>
								다시 시도
							</Button>
						)}
						<Button
							onClick={() => router.push('/onboarding')}
							size="md"
							variant="outline"
							className="min-h-[44px] min-w-[120px]"
						>
							온보딩으로 돌아가기
						</Button>
					</div>
				</main>
			</div>
		);
	}

	// 카드가 없는 경우
	if (cards.length === 0) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md text-center">
					<p className="text-base text-zinc-600 dark:text-zinc-400">
						카드를 불러올 수 없습니다.
					</p>
					<Button
						onClick={() => router.push('/onboarding')}
						size="md"
						variant="outline"
						className="mt-4 min-h-[44px] min-w-[120px]"
					>
						온보딩으로 돌아가기
					</Button>
				</main>
			</div>
		);
	}

	// 전체 카드 목록 (무료 카드 + 잠금 카드)
	const totalCards = cards.length + paidTopics.length;
	const isFreeCard = currentIndex < cards.length;
	const isLastCard = currentIndex === totalCards - 1;

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
			<main className="mx-auto w-full max-w-md">
				<div
					key={currentIndex}
					className="animate-in fade-in slide-in-from-right-4 duration-300"
				>
					{isFreeCard ? (
						// 무료 카드
						<Card
							card={cards[currentIndex]}
							topicName={
								getTopicById(cards[currentIndex].topicId)?.name
							}
							currentIndex={currentIndex}
							totalCount={totalCards}
							onNext={handleNext}
							showNextButton={true}
						/>
					) : (
						// 잠금 카드 (유료 주제)
						<LockedCard
							topicName={
								paidTopics[currentIndex - cards.length].name
							}
							currentIndex={currentIndex}
							totalCount={totalCards}
							onNext={isLastCard ? undefined : handleNext}
							onUnlock={handleUnlock}
							showNextButton={!isLastCard}
						/>
					)}
				</div>

				{/* 마지막 카드 안내 */}
				{isLastCard && (
					<div className="mt-6 text-center">
						<p className="text-sm text-zinc-500 dark:text-zinc-400">
							모든 카드를 확인하셨습니다.
						</p>
						<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
							유료 주제를 해금하여 더 깊은 해석을 확인하세요.
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
