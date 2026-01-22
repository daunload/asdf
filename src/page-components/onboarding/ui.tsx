'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function OnboardingPage() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [birthTime, setBirthTime] = useState('');
	const [birthTimePeriod, setBirthTimePeriod] = useState<'AM' | 'PM'>('AM');
	const [location, setLocation] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate submission and navigation
		setTimeout(() => {
			setIsSubmitting(false);
			router.push('/analysis');
		}, 1500);
	};

	return (
		<main className="flex-1 relative flex flex-col items-center py-12 px-6 min-h-[calc(100vh-64px)]">
			{/* Background Overlay */}
			<div className="absolute inset-0 star-field pointer-events-none opacity-40" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

			<div className="max-w-2xl w-full relative z-10">
				<div className="mb-12">
					<div className="flex items-center justify-between mb-4">
						<span className="text-accent-gold text-xs font-bold uppercase tracking-[0.2em]">
							Step 1 of 2
						</span>
						<span className="text-white/40 text-xs font-medium">
							기본 정보 입력
						</span>
					</div>
					<div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
						<div className="w-1/2 h-full bg-accent-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
					</div>
				</div>

				<div className="text-center mb-10">
					<h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
						당신의{' '}
						<span className="text-accent-gold">탄생 정보</span>
						를<br />
						입력해주세요
					</h1>
					<p className="text-white/60">
						정확한 별자리 분석을 위해 태어난 시간과 장소를 상세히
						알려주세요.
					</p>
				</div>

				<div className="glass-effect p-8 md:p-12 rounded-3xl border-white/10 shadow-2xl">
					<form className="space-y-8" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label
								className="block text-sm font-semibold text-white/80 ml-1"
								htmlFor="name"
							>
								이름
							</label>
							<input
								className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 form-input-focus"
								id="name"
								placeholder="예: 홍길동"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>

						<div className="space-y-2">
							<label
								className="block text-sm font-semibold text-white/80 ml-1"
								htmlFor="dob"
							>
								생년월일
							</label>
							<div className="relative">
								<input
									className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 form-input-focus appearance-none"
									id="dob"
									type="date"
									value={birthDate}
									onChange={(e) =>
										setBirthDate(e.target.value)
									}
									required
								/>
								<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
									calendar_month
								</span>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<label
									className="block text-sm font-semibold text-white/80 ml-1"
									htmlFor="time"
								>
									태어난 시간
								</label>
								<div className="relative">
									<input
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 form-input-focus"
										id="time"
										type="time"
										value={birthTime}
										onChange={(e) =>
											setBirthTime(e.target.value)
										}
										required
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block text-sm font-semibold text-white/80 ml-1">
									오전 / 오후
								</label>
								<div className="flex bg-white/5 border border-white/10 rounded-xl p-1 h-[58px]">
									<button
										className={`flex-1 rounded-lg font-bold text-sm transition-all ${
											birthTimePeriod === 'AM'
												? 'bg-accent-gold text-background-dark'
												: 'text-white/60 hover:text-white'
										}`}
										type="button"
										onClick={() => setBirthTimePeriod('AM')}
									>
										오전
									</button>
									<button
										className={`flex-1 rounded-lg font-bold text-sm transition-all ${
											birthTimePeriod === 'PM'
												? 'bg-accent-gold text-background-dark'
												: 'text-white/60 hover:text-white'
										}`}
										type="button"
										onClick={() => setBirthTimePeriod('PM')}
									>
										오후
									</button>
								</div>
							</div>
						</div>

						<div className="space-y-2">
							<label
								className="block text-sm font-semibold text-white/80 ml-1"
								htmlFor="location"
							>
								태어난 도시
							</label>
							<div className="relative">
								<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
									location_on
								</span>
								<input
									className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 form-input-focus"
									id="location"
									placeholder="도시 이름을 검색하세요 (예: 서울, Busan)"
									type="text"
									value={location}
									onChange={(e) =>
										setLocation(e.target.value)
									}
									required
								/>
							</div>
						</div>

						<div className="pt-4">
							<button
								className="w-full h-16 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-xl shadow-xl shadow-primary/30 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									'분석 중...'
								) : (
									<>
										<span>AI 분석 시작하기</span>
										<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
											auto_fix_high
										</span>
									</>
								)}
							</button>
							<p className="text-center text-white/30 text-xs mt-6">
								입력하신 정보는 암호화되며 차트 계산 용도로만
								사용됩니다.
							</p>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
