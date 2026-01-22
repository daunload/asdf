'use client';

import { Card, LockedCard } from '@/entities/card/ui';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { ErrorMessage } from '@/shared/ui/error-message';
import { freeTopics, paidTopics, getTopicById } from '@/shared/config/topics';
import { useCardFlow } from './model/use-card-flow';

export function CardsPage() {
	const {
		cards,
		currentIndex,
		isLoading,
		error,
		handleNext,
		handleRetry,
		handleUnlock,
		handleReturnToOnboarding,
	} = useCardFlow();

	// Loading State
	if (isLoading) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-16 sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md text-center">
					<div className="space-y-8">
						<Spinner label="해석을 만들고 있어요">
							<div className="space-y-2">
								<h2 className="text-xl font-semibold text-white">
									해석을 만들고 있어요
								</h2>
								<p className="text-base text-zinc-400">
									출생차트를 계산하고 카드를 생성하는
									중입니다...
								</p>
							</div>
						</Spinner>
					</div>
				</main>
			</div>
		);
	}

	// Error State
	if (error) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-16 sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md">
					<ErrorMessage
						message={error.message}
						retry={error.retry ? handleRetry : undefined}
						secondaryAction={
							<Button
								onClick={handleReturnToOnboarding}
								size="md"
								variant="outline"
								className="min-h-[44px] min-w-[120px]"
							>
								온보딩으로 돌아가기
							</Button>
						}
					/>
				</main>
			</div>
		);
	}

	// Empty State
	if (cards.length === 0) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-16 sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md text-center">
					<p className="text-base text-zinc-400">
						카드를 불러올 수 없습니다.
					</p>
					<Button
						onClick={handleReturnToOnboarding}
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

	// Logic for display
	const totalCards = cards.length + paidTopics.length;
	const isFreeCard = currentIndex < cards.length;
	const isLastCard = currentIndex === totalCards - 1;

	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
			{/* Ambient Light for Cards Page */}
			<div
				className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/2 opacity-30 blur-[100px]"
				style={{
					background:
						'radial-gradient(circle, var(--celestial-violet) 0%, transparent 70%)',
				}}
			/>

			<main className="relative z-10 mx-auto w-full max-w-md">
				<div
					key={currentIndex}
					className="animate-in fade-in slide-in-from-right-4 duration-300"
				>
					{isFreeCard ? (
						// Free Card
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
						// Locked Card (Paid Topic)
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

				{/* Last Card Message */}
				{isLastCard && (
					<div className="mt-6 text-center">
						<p className="text-sm text-zinc-400">
							모든 카드를 확인하셨습니다.
						</p>
						<p className="mt-2 text-sm text-zinc-400">
							유료 주제를 해금하여 더 깊은 해석을 확인하세요.
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
