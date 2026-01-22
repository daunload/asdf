/**
 * 한 장 카드 컴포넌트
 */

'use client';

import * as React from 'react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

export interface CardData {
	topicId: string;
	symbol: string;
	body: string;
	cta: string;
}

export interface CardProps {
	card: CardData;
	topicName?: string;
	currentIndex: number;
	totalCount: number;
	onNext?: () => void;
	onPrev?: () => void;
	showNextButton?: boolean;
	isBlurred?: boolean;
	className?: string;
}

// 카테고리 매핑 (주제 ID에 따라)
const getCategory = (topicId: string): string => {
	const categoryMap: Record<string, string> = {
		'personality-core': 'CORE ESSENCE',
		'first-impression': 'EXTERNAL IMAGE',
		'talents-strengths': 'STRENGTHS',
		'challenges-growth': 'GROWTH',
	};
	return categoryMap[topicId] || 'INSIGHT';
};

// 태그 생성 (주제에 따라)
const getTags = (topicId: string, body: string): string[] => {
	// 간단한 키워드 추출 로직 (실제로는 더 정교하게 구현 가능)
	const tags: string[] = [];
	if (topicId.includes('personality')) {
		tags.push('Creative Vitality', 'Fixed Fire', 'Fifth House');
	} else if (topicId.includes('first-impression')) {
		tags.push('First Impression', 'External Image', 'Ascendant');
	} else if (topicId.includes('talents')) {
		tags.push('Natural Talent', 'Strengths', 'Abilities');
	} else if (topicId.includes('challenges')) {
		tags.push('Growth', 'Challenges', 'Opportunities');
	} else {
		tags.push('Insight', 'Wisdom', 'Guidance');
	}
	return tags;
};

export function Card({
	card,
	topicName,
	currentIndex,
	totalCount,
	onNext,
	onPrev,
	showNextButton = true,
	isBlurred = false,
	className,
}: CardProps) {
	const category = getCategory(card.topicId);
	const tags = getTags(card.topicId, card.body);
	const hasPrev = onPrev !== undefined;
	const hasNext = onNext !== undefined;

	return (
		<article
			className={cn(
				'relative flex h-[600px] flex-col rounded-3xl p-8 sm:p-10',
				'bg-[#393C48] border-2',
				'transition-opacity duration-300',
				isBlurred
					? 'opacity-50'
					: 'shadow-[0_0_40px_rgba(255,215,0,0.3)]',
				className,
			)}
			style={{
				borderColor: isBlurred
					? 'rgba(255, 215, 0, 0.2)'
					: 'rgba(255, 215, 0, 0.5)',
				boxShadow: isBlurred
					? 'none'
					: '0 0 30px rgba(255, 215, 0, 0.2), inset 0 0 30px rgba(255, 215, 0, 0.05)',
			}}
			role="article"
			aria-label={`${topicName || '카드'} ${currentIndex + 1}번째`}
		>
			{/* Icon */}
			<div className="mb-6 flex justify-center">
				<div
					className="text-7xl sm:text-8xl"
					style={{
						filter: isBlurred
							? 'none'
							: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
						color: '#FFD700',
					}}
					aria-hidden="true"
				>
					{card.symbol}
				</div>
			</div>

			{/* Category */}
			<div className="mb-2 text-center">
				<p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
					{category}
				</p>
			</div>

			{/* Title */}
			{topicName && (
				<h2 className="mb-6 text-center text-2xl font-bold text-white sm:text-3xl">
					{topicName}
				</h2>
			)}

			{/* Description */}
			<div className="mb-6 flex-1 overflow-y-auto">
				<p className="text-center text-base italic leading-relaxed text-white sm:text-lg">
					{card.body}
				</p>
			</div>

			{/* Tags */}
			<div className="mb-6 flex flex-wrap justify-center gap-2">
				{tags.map((tag, idx) => (
					<span
						key={idx}
						className="rounded-full bg-[#2A2D38] px-4 py-2 text-xs font-medium text-white"
					>
						{tag}
					</span>
				))}
			</div>

		</article>
	);
}

/**
 * 잠금 카드 컴포넌트 (유료 주제)
 */
export interface LockedCardProps {
	topicName: string;
	currentIndex: number;
	totalCount: number;
	onNext?: () => void;
	onUnlock?: () => void;
	showNextButton?: boolean;
	isBlurred?: boolean;
	className?: string;
}

export function LockedCard({
	topicName,
	currentIndex,
	totalCount,
	onNext,
	onUnlock,
	showNextButton = true,
	isBlurred = false,
	className,
}: LockedCardProps) {
	const hasNext = onNext !== undefined;

	return (
		<article
			className={cn(
				'relative flex h-[600px] flex-col items-center justify-center rounded-3xl p-8 sm:p-10',
				'overflow-hidden border-2 bg-[#393C48]/50 backdrop-blur-sm',
				'transition-opacity duration-300',
				isBlurred
					? 'opacity-50 border-[#FFD700]/20'
					: 'border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]',
				className,
			)}
			role="article"
			aria-label={`잠금된 카드: ${topicName} ${currentIndex + 1}번째`}
		>
			{/* 콘텐츠 */}
			<div className="relative z-10 flex flex-col items-center space-y-6 text-center">
				{/* 자물쇠 아이콘 */}
				<div
					className="text-7xl sm:text-8xl"
					style={{
						filter: 'grayscale(100%)',
						color: '#FFD700',
						opacity: 0.6,
					}}
					aria-hidden="true"
				>
					🔒
				</div>

				{/* 주제명 */}
				<h2 className="text-2xl font-bold text-white sm:text-3xl">
					{topicName}
				</h2>

				{/* 잠금 안내 문구 */}
				<div className="space-y-2">
					<p
						className="text-base font-medium"
						style={{ color: '#FFD700' }}
					>
						이 카드를 보려면 해금이 필요해요
					</p>
					<p className="text-sm text-gray-400">
						더 깊은 해석을 확인하려면 결제가 필요합니다.
					</p>
				</div>


				{/* CTA 버튼 */}
				{!isBlurred && onUnlock && (
					<Button
						onClick={onUnlock}
						size="lg"
						variant="default"
						className="min-h-[48px] w-full max-w-xs rounded-lg"
						style={{
							background:
								'linear-gradient(to right, #7c3aed, #06b6d4)',
							boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
						}}
						aria-label={`${topicName} 해금하기`}
					>
						해금하기
					</Button>
				)}
			</div>
		</article>
	);
}
