import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CardData } from '@/entities/card/ui';
import { freeTopics, paidTopics } from '@/shared/config/topics';

interface CardsResponse {
	cards: CardData[];
}

export function useCardFlow() {
	const router = useRouter();
	const [cards, setCards] = useState<CardData[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<{
		message: string;
		code?: string;
		retry?: boolean;
	} | null>(null);

	// Fetch Cards
	useEffect(() => {
		async function fetchCards() {
			setIsLoading(true);
			setError(null);

			try {
				const freeTopicIds = freeTopics.map((topic) => topic.id);

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

	const handleNext = useCallback(() => {
		const totalCards = cards.length + paidTopics.length;
		if (currentIndex < totalCards - 1) {
			setCurrentIndex((prev) => prev + 1);
		}
	}, [currentIndex, cards.length]);

	const handleRetry = useCallback(() => {
		window.location.reload();
	}, []);

	const handleUnlock = useCallback(() => {
		const currentUrl = window.location.pathname + window.location.search;
		router.push(
			`/auth/login?callbackUrl=${encodeURIComponent(currentUrl)}`,
		);
	}, [router]);

	const handleReturnToOnboarding = useCallback(() => {
		router.push('/onboarding');
	}, [router]);

	return {
		cards,
		currentIndex,
		isLoading,
		error,
		handleNext,
		handleRetry,
		handleUnlock,
		handleReturnToOnboarding,
	};
}
