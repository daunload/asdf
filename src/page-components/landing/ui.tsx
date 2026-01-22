'use client';

import Link from 'next/link';

export function LandingPage() {
	return (
		<main className="flex-1 relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
			{/* Gradient Overlay for Hero */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

			<div className="max-w-[960px] mx-auto px-6 py-20 relative z-10 w-full">
				<section className="text-center mb-16">
					<div className="mb-6 flex justify-center">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-widest">
							<span className="material-symbols-outlined text-sm">
								temp_preferences_custom
							</span>
							AI 기반 점성술
						</div>
					</div>

					<h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-[-0.033em] mb-8">
						당신의 <br className="hidden md:block" />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-white">
							우주적 설계도
						</span>
						를 발견하세요
					</h1>

					<p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
						생성형 AI와 고대 점성학의 지혜가 만났습니다.
						<br className="hidden md:block" /> 당신이 태어난 그
						순간, 행성들의 정교한 배치가 말해주는 진정한 삶의 지도를
						확인해보세요.
					</p>

					<div className="flex flex-col items-center gap-6">
						<Link
							href="/onboarding"
							className="inline-flex items-center justify-center gap-3 w-full max-w-md h-20 rounded-xl text-white text-xl font-bold transition-all transform hover:scale-[1.02] bg-linear-to-r from-[#7c3aed] to-[#06b6d4] shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
						>
							<span>내 출생 차트 분석하기</span>
							<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
								rocket_launch
							</span>
						</Link>
						<p className="text-white/30 text-sm">
							생년월일을 입력하고 당신의 별자리 여정을 시작하세요.
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}
