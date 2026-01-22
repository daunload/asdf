'use client';

import React, { useEffect, useState } from 'react';
import { Card, LockedCard } from '@/entities/card/ui';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { ErrorMessage } from '@/shared/ui/error-message';
import { freeTopics, paidTopics, getTopicById } from '@/shared/config/topics';
import { useCardFlow } from './model/use-card-flow';
import { cn } from '@/shared/lib/utils';

export function CardsPage() {
	const {
		cards,
		currentIndex,
		isLoading,
		error,
		handleNext,
		handlePrev,
		handleRetry,
		handleUnlock,
		handleReturnToOnboarding,
	} = useCardFlow();

	// 키보드 네비게이션 지원
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// 입력 필드에 포커스가 있으면 무시
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return;
			}

			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				handlePrev();
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				handleNext();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleNext, handlePrev]);

	// 터치 제스처 지원
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);

	const minSwipeDistance = 50;

	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;

		if (isLeftSwipe) {
			handleNext();
		} else if (isRightSwipe) {
			handlePrev();
		}
	};

	// Loading State
	if (isLoading) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-[#21262D] px-4 py-16 sm:px-6 lg:px-8">
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
			<div className="flex min-h-screen flex-col items-center justify-center bg-[#21262D] px-4 py-16 sm:px-6 lg:px-8">
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
			<div className="flex min-h-screen flex-col items-center justify-center bg-[#21262D] px-4 py-16 sm:px-6 lg:px-8">
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
	const hasPrev = currentIndex > 0;
	const hasNext = currentIndex < totalCards - 1;

	// Helper function to safely get paid topic name
	const getPaidTopicName = (index: number): string => {
		const paidIndex = index - cards.length;
		if (paidIndex < 0 || paidIndex >= paidTopics.length) {
			return 'Premium Topic';
		}
		return paidTopics[paidIndex]?.name || 'Premium Topic';
	};

	// Get previous and next cards for carousel
	const prevCard = hasPrev
		? currentIndex - 1 < cards.length
			? cards[currentIndex - 1]
			: null
		: null;
	const nextCard = hasNext
		? currentIndex + 1 < cards.length
			? cards[currentIndex + 1]
			: null
		: null;

	return (
		<div className="flex min-h-screen flex-col">
			{/* Main Content Area with Gradient Background */}
			<div className="relative flex-1 bg-gradient-to-b from-[#DADDE2] via-[#C8CBD0] to-[#21262D]">
				<main
					className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				>
					{/* Page Title and Subtitle */}
					<div className="mb-8 text-center">
						<h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
							Your Celestial Blueprint
						</h1>
						<p className="mt-3 text-base text-gray-700 sm:text-lg">
							{totalCards} custom insights calculated from the
							alignment of the stars at your birth.
						</p>
					</div>

					{/* Card Carousel Container - Fixed Height */}
					<div className="relative mb-8 flex min-h-[600px] items-center justify-center">
						{/* Navigation Arrow - Left (Fixed Position) */}
						<button
							onClick={handlePrev}
							disabled={!hasPrev}
							className={cn(
								'absolute left-0 z-20 flex h-12 w-12 items-center justify-center rounded-full transition-all',
								'bg-[#393C48]/80 backdrop-blur-sm border-2 border-[#FFD700]/30',
								hasPrev
									? 'text-[#FFD700] hover:bg-[#FFD700]/20 hover:border-[#FFD700]/50 cursor-pointer shadow-lg'
									: 'text-gray-600 border-gray-600/30 cursor-not-allowed opacity-50',
								'md:left-4',
							)}
							aria-label="이전 카드"
						>
							<span className="material-symbols-outlined text-3xl">
								chevron_left
							</span>
						</button>

						{/* Card Container - Fixed Width */}
						<div className="relative w-full max-w-md">
							{/* Previous Card (Blurred) - Always Reserve Space */}
							<div
								className={cn(
									'absolute left-0 top-1/2 z-0 -translate-x-full -translate-y-1/2 transition-opacity duration-300',
									'hidden md:block',
									hasPrev ? 'opacity-50' : 'opacity-0 pointer-events-none',
								)}
								style={{ width: '280px' }}
							>
								<div className="blur-sm">
									{prevCard ? (
										<Card
											card={prevCard}
											topicName={
												getTopicById(prevCard.topicId)
													?.name
											}
											currentIndex={currentIndex - 1}
											totalCount={totalCards}
											isBlurred={true}
											className="pointer-events-none"
										/>
									) : (
										<LockedCard
											topicName={getPaidTopicName(
												currentIndex - 1,
											)}
											currentIndex={currentIndex - 1}
											totalCount={totalCards}
											isBlurred={true}
											className="pointer-events-none"
										/>
									)}
								</div>
							</div>

							{/* Current Card (Active) - Fixed Position */}
							<div className="relative z-10">
								<div
									key={currentIndex}
									className="animate-in fade-in slide-in-from-right-4 duration-500"
								>
									{isFreeCard ? (
										<Card
											card={cards[currentIndex]}
											topicName={
												getTopicById(
													cards[currentIndex].topicId,
												)?.name
											}
											currentIndex={currentIndex}
											totalCount={totalCards}
										/>
									) : (
										<LockedCard
											topicName={getPaidTopicName(
												currentIndex,
											)}
											currentIndex={currentIndex}
											totalCount={totalCards}
											onUnlock={handleUnlock}
										/>
									)}
								</div>
							</div>

							{/* Next Card (Blurred) - Always Reserve Space */}
							<div
								className={cn(
									'absolute right-0 top-1/2 z-0 translate-x-full -translate-y-1/2 transition-opacity duration-300',
									'hidden md:block',
									hasNext ? 'opacity-50' : 'opacity-0 pointer-events-none',
								)}
								style={{ width: '280px' }}
							>
								<div className="blur-sm">
									{nextCard ? (
										<Card
											card={nextCard}
											topicName={
												getTopicById(nextCard.topicId)
													?.name
											}
											currentIndex={currentIndex + 1}
											totalCount={totalCards}
											isBlurred={true}
											className="pointer-events-none"
										/>
									) : (
										<LockedCard
											topicName={getPaidTopicName(
												currentIndex + 1,
											)}
											currentIndex={currentIndex + 1}
											totalCount={totalCards}
											isBlurred={true}
											className="pointer-events-none"
										/>
									)}
								</div>
							</div>
						</div>

						{/* Navigation Arrow - Right (Fixed Position) */}
						<button
							onClick={handleNext}
							disabled={!hasNext}
							className={cn(
								'absolute right-0 z-20 flex h-12 w-12 items-center justify-center rounded-full transition-all',
								'bg-[#393C48]/80 backdrop-blur-sm border-2 border-[#FFD700]/30',
								hasNext
									? 'text-[#FFD700] hover:bg-[#FFD700]/20 hover:border-[#FFD700]/50 cursor-pointer shadow-lg'
									: 'text-gray-600 border-gray-600/30 cursor-not-allowed opacity-50',
								'md:right-4',
							)}
							aria-label="다음 카드"
						>
							<span className="material-symbols-outlined text-3xl">
								chevron_right
							</span>
						</button>
					</div>

					{/* Card Counter - Fixed Position */}
					<div className="mb-8 flex items-center justify-center gap-4">
						<button
							onClick={handlePrev}
							disabled={!hasPrev}
							className={cn(
								'flex h-10 w-10 items-center justify-center rounded-full transition-all md:hidden',
								hasPrev
									? 'text-[#FFD700] hover:bg-[#FFD700]/20 cursor-pointer'
									: 'text-gray-600 cursor-not-allowed opacity-50',
							)}
							aria-label="이전 카드"
						>
							<span className="material-symbols-outlined text-2xl">
								chevron_left
							</span>
						</button>

						<div className="text-center">
							<p
								className="text-lg font-semibold"
								style={{ color: '#FFD700' }}
							>
								{currentIndex + 1} OF {totalCards}
							</p>
							<div
								className="mx-auto mt-1 h-0.5 w-16"
								style={{ backgroundColor: '#FFD700' }}
							/>
						</div>

						<button
							onClick={handleNext}
							disabled={!hasNext}
							className={cn(
								'flex h-10 w-10 items-center justify-center rounded-full transition-all md:hidden',
								hasNext
									? 'text-[#FFD700] hover:bg-[#FFD700]/20 cursor-pointer'
									: 'text-gray-600 cursor-not-allowed opacity-50',
							)}
							aria-label="다음 카드"
						>
							<span className="material-symbols-outlined text-2xl">
								chevron_right
							</span>
						</button>
					</div>

					{/* Action Buttons - Always Visible, Fixed Position */}
					<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
						{isFreeCard ? (
							<>
								<Button
									variant="outline"
									size="lg"
									className="min-h-[48px] rounded-lg bg-[#393C48] text-white hover:bg-[#4A4D5A] transition-all"
									onClick={() => {
										// Share functionality
										if (navigator.share) {
											navigator.share({
												title: getTopicById(
													cards[currentIndex].topicId,
												)?.name,
												text: cards[currentIndex].body,
											});
										} else {
											// Fallback: copy to clipboard
											navigator.clipboard.writeText(
												`${getTopicById(cards[currentIndex].topicId)?.name}\n${cards[currentIndex].body}`,
											);
											alert('클립보드에 복사되었습니다.');
										}
									}}
								>
									<span className="material-symbols-outlined mr-2">
										share
									</span>
									Share Insight
								</Button>
								<Button
									variant="outline"
									size="lg"
									className="min-h-[48px] rounded-lg bg-[#393C48] text-white hover:bg-[#4A4D5A] transition-all"
									onClick={() => {
										// Download PDF functionality
										window.print();
									}}
								>
									<span className="material-symbols-outlined mr-2">
										download
									</span>
									Download PDF
								</Button>
							</>
						) : (
							<div className="flex items-center justify-center text-sm text-gray-500">
								카드를 해금하면 더 많은 기능을 사용할 수 있습니다
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
