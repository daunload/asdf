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
	showNextButton?: boolean;
	className?: string;
}

export function Card({
	card,
	topicName,
	currentIndex,
	totalCount,
	onNext,
	showNextButton = true,
	className,
}: CardProps) {
	return (
		<article
			className={cn(
				'flex min-h-[400px] flex-col items-center justify-center space-y-6 rounded-2xl p-8',
				'border border-transparent bg-clip-border',
				'shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-transform duration-300 hover:scale-[1.02]',
				className,
			)}
			style={{
				background: `
					linear-gradient(#020617, #020617) padding-box,
					linear-gradient(to bottom right, var(--celestial-violet), var(--celestial-blue)) border-box
				`,
			}}
			role="article"
			aria-label={`${topicName || '카드'} ${currentIndex + 1}번째`}
		>
			{/* 심볼 */}
			<div
				className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
				aria-hidden="true"
			>
				{card.symbol}
			</div>

			{/* 주제명 (선택) */}
			{topicName && (
				<h2 className="text-xl font-bold text-white drop-shadow-md">
					{topicName}
				</h2>
			)}

			{/* 본문 (1~2문장) */}
			<p className="text-center text-base leading-relaxed text-zinc-300">
				{card.body}
			</p>

			{/* 진행 표시 (선택) */}
			<div className="text-sm text-zinc-500">
				{currentIndex + 1} / {totalCount}
			</div>

			{/* CTA 버튼 */}
			{showNextButton && onNext && (
				<Button
					onClick={onNext}
					size="lg"
					variant="default"
					className="min-h-[44px] min-w-[120px]"
					aria-label={`다음 카드 보기 (${currentIndex + 2}번째)`}
				>
					{card.cta || '다음 카드'}
				</Button>
			)}
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
	className?: string;
}

export function LockedCard({
	topicName,
	currentIndex,
	totalCount,
	onNext,
	onUnlock,
	showNextButton = true,
	className,
}: LockedCardProps) {
	return (
		<article
			className={cn(
				'relative flex min-h-[400px] flex-col items-center justify-center space-y-6 rounded-2xl p-8',
				'overflow-hidden border border-white/10 bg-black/80',
				'shadow-[0_0_20px_rgba(124,58,237,0.1)]',
				className,
			)}
			role="article"
			aria-label={`잠금된 카드: ${topicName} ${currentIndex + 1}번째`}
		>
			{/* 블러 배경 */}
			<div
				className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900"
				style={{
					opacity: 0.9,
				}}
				aria-hidden="true"
			/>

			{/* Celestial Glow Blobs for Locked State */}
			<div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-celestial-violet/20 blur-[50px]" />
			<div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-celestial-blue/20 blur-[50px]" />

			{/* 콘텐츠 */}
			<div className="relative z-10 flex flex-col items-center space-y-6 text-center">
				{/* 자물쇠 아이콘 */}
				<div
					className="text-6xl grayscale transition-all duration-500 hover:grayscale-0"
					aria-hidden="true"
				>
					🔒
				</div>

				{/* 주제명 */}
				<h2 className="text-xl font-bold text-white">{topicName}</h2>

				{/* 잠금 안내 문구 */}
				<div className="space-y-2">
					<p className="text-base font-medium text-celestial-violet drop-shadow-sm">
						이 카드를 보려면 해금이 필요해요
					</p>
					<p className="text-sm text-zinc-400">
						더 깊은 해석을 확인하려면 결제가 필요합니다.
					</p>
				</div>

				{/* 진행 표시 */}
				<div className="text-sm text-zinc-600">
					{currentIndex + 1} / {totalCount}
				</div>

				{/* CTA 버튼들 */}
				<div className="flex flex-col gap-3 w-full max-w-xs">
					{onUnlock && (
						<Button
							onClick={onUnlock}
							size="lg"
							variant="default"
							className="min-h-[44px] w-full bg-linear-to-r from-celestial-violet to-indigo-500 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
							aria-label={`${topicName} 해금하기`}
						>
							해금하기
						</Button>
					)}
					{showNextButton && onNext && (
						<Button
							onClick={onNext}
							size="md"
							variant="ghost"
							className="min-h-[44px] w-full text-zinc-400 hover:text-white"
							aria-label={`다음 카드 보기 (${currentIndex + 2}번째)`}
						>
							다음 카드
						</Button>
					)}
				</div>
			</div>
		</article>
	);
}
