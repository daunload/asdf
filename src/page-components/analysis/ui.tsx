'use client';

export function AnalysisPage() {
	return (
		<main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-[calc(100vh-64px)]">
			{/* Sidebar for Navigation */}
			<aside className="w-full lg:w-64 border-r border-white/10 p-4 flex flex-col gap-6 bg-background-dark hidden lg:flex">
				<div className="flex flex-col gap-1">
					<h1 className="text-base font-bold text-white">
						분석 도구
					</h1>
					<p className="text-white/40 text-xs">AI 기반 인사이트</p>
				</div>
				<div className="flex flex-col gap-2">
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
						<span className="material-symbols-outlined text-lg">
							auto_awesome
						</span>
						<p className="text-sm font-semibold">출생 차트</p>
					</button>
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/5 transition-colors">
						<span className="material-symbols-outlined text-lg">
							schedule
						</span>
						<p className="text-sm font-medium">오늘의 운세</p>
					</button>
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/5 transition-colors">
						<span className="material-symbols-outlined text-lg">
							favorite
						</span>
						<p className="text-sm font-medium">궁합 분석</p>
					</button>
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/5 transition-colors">
						<span className="material-symbols-outlined text-lg">
							settings
						</span>
						<p className="text-sm font-medium">설정</p>
					</button>
				</div>
				<div className="mt-auto p-4 rounded-xl glass-card border border-white/10">
					<p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
						다음 주요 이동
					</p>
					<p className="text-sm font-medium text-white">목성 역행</p>
					<p className="text-xs text-white/40">3일 후 시작됨</p>
				</div>
			</aside>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col overflow-y-auto">
				{/* Page Heading Section */}
				<div className="p-6 lg:p-8 flex flex-wrap justify-between items-end gap-6">
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
							나의 출생 차트 분석
						</h1>
						<div className="flex items-center gap-2 text-white/50">
							<span className="material-symbols-outlined text-sm">
								location_on
							</span>
							<p className="text-sm font-medium">
								1992년 6월 15일 • 오전 10:30 • 영국 런던
							</p>
						</div>
					</div>
					<div className="flex gap-3">
						<button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-white">
							<span className="material-symbols-outlined text-xl">
								share
							</span>
							<span className="text-sm font-bold">공유하기</span>
						</button>
						<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20 transition-all">
							<span className="material-symbols-outlined text-xl">
								file_download
							</span>
							<span className="text-sm font-bold">
								PDF 다운로드
							</span>
						</button>
					</div>
				</div>

				{/* Dashboard Grid */}
				<div className="px-6 lg:px-8 pb-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
					{/* Left: Interactive Chart */}
					<div className="flex flex-col gap-4">
						<div className="chart-container relative rounded-2xl border border-white/10 p-8 aspect-square flex items-center justify-center bg-white/5 overflow-hidden">
							{/* Visual placeholder for the Natal Chart SVG/Canvas */}
							<div className="relative w-full h-full flex items-center justify-center">
								<div className="absolute inset-0 rounded-full border-[12px] border-primary/5"></div>
								<div className="absolute inset-4 rounded-full border border-white/10"></div>
								{/* Decorative Zodiac Ring */}
								<div className="w-full h-full rounded-full border-2 border-white/10 relative flex items-center justify-center rotate-45">
									<div className="absolute top-0 text-primary">
										<span className="material-symbols-outlined">
											flare
										</span>
									</div>
									<div className="absolute right-0 text-primary opacity-50">
										<span className="material-symbols-outlined">
											nights_stay
										</span>
									</div>
									<div className="absolute bottom-0 text-primary opacity-30">
										<span className="material-symbols-outlined">
											brightness_5
										</span>
									</div>
									<div className="absolute left-0 text-primary opacity-60">
										<span className="material-symbols-outlined">
											star
										</span>
									</div>
								</div>
								{/* Central Graphic */}
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="w-3/4 h-3/4 rounded-full bg-primary/20 blur-3xl animate-pulse"></div>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4">
							<div className="p-4 rounded-xl glass-card text-center">
								<span className="material-symbols-outlined text-primary mb-1">
									wb_sunny
								</span>
								<p className="text-xs text-white/50 uppercase tracking-tighter">
									태양
								</p>
								<p className="text-lg font-bold text-white">
									쌍둥이자리
								</p>
							</div>
							<div className="p-4 rounded-xl glass-card text-center">
								<span className="material-symbols-outlined text-primary mb-1">
									brightness_3
								</span>
								<p className="text-xs text-white/50 uppercase tracking-tighter">
									달
								</p>
								<p className="text-lg font-bold text-white">
									사수자리
								</p>
							</div>
							<div className="p-4 rounded-xl glass-card text-center">
								<span className="material-symbols-outlined text-primary mb-1">
									expand_less
								</span>
								<p className="text-xs text-white/50 uppercase tracking-tighter">
									상승궁
								</p>
								<p className="text-lg font-bold text-white">
									사자자리
								</p>
							</div>
						</div>
					</div>

					{/* Right: AI Interpretation */}
					<div className="flex flex-col gap-6">
						{/* AI Header */}
						<div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
							<div className="bg-primary p-2 rounded-lg text-white">
								<span className="material-symbols-outlined">
									psychology
								</span>
							</div>
							<div>
								<h3 className="font-bold text-sm text-white">
									AstroAI 차트 해석
								</h3>
								<p className="text-xs text-white/50">
									14개의 행성 각도를 기반으로 1.4초 만에
									생성됨
								</p>
							</div>
						</div>

						{/* Section: Sun Moon Rising */}
						<section className="flex flex-col gap-3">
							<div className="flex items-center gap-2">
								<h4 className="text-lg font-bold text-white">
									태양, 달, 그리고 상승궁
								</h4>
								<div className="h-px flex-1 bg-white/10"></div>
							</div>
							<p className="text-sm leading-relaxed text-white/60">
								당신의 <strong>쌍둥이자리 태양</strong>은 지적
								자극과 소통에 대한 깊은 욕구를 나타냅니다. 이는
								자유와 철학적 진리를 갈망하는{' '}
								<strong>사수자리 달</strong>과 균형을 이룹니다.
								또한 <strong>사자자리 상승궁</strong>으로 인해
								당신은 카리스마 있고 창의적이며 따뜻한
								페르소나를 세상에 보여주며, 종종 사교적인
								상황에서 자연스럽게 리더 역할을 맡게 됩니다.
							</p>
						</section>

						{/* Section: Personality */}
						<section className="flex flex-col gap-3">
							<div className="flex items-center gap-2">
								<h4 className="text-lg font-bold text-white">
									핵심 성격 특성
								</h4>
								<div className="h-px flex-1 bg-white/10"></div>
							</div>
							<div className="grid grid-cols-1 gap-2">
								<div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
									<span className="material-symbols-outlined text-primary text-sm mt-0.5">
										check_circle
									</span>
									<div>
										<p className="text-sm font-bold text-white">
											적응력
										</p>
										<p className="text-xs text-white/50">
											쌍둥이자리 수성은 변화하는 환경에서
											높은 적응력을 발휘하게 합니다.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
									<span className="material-symbols-outlined text-primary text-sm mt-0.5">
										check_circle
									</span>
									<div>
										<p className="text-sm font-bold text-white">
											직관적 비전
										</p>
										<p className="text-xs text-white/50">
											해왕성과 상승궁의 강한 트라인 각도는
											생생한 상상력을 부여합니다.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
									<span className="material-symbols-outlined text-primary text-sm mt-0.5">
										check_circle
									</span>
									<div>
										<p className="text-sm font-bold text-white">
											전략적 야망
										</p>
										<p className="text-xs text-white/50">
											12하우스의 화성은 조용하지만 강력한
											성공에 대한 열망을 시사합니다.
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* Section: Life Path */}
						<section className="flex flex-col gap-3">
							<div className="flex items-center gap-2">
								<h4 className="text-lg font-bold text-white">
									삶의 경로와 직업
								</h4>
								<div className="h-px flex-1 bg-white/10"></div>
							</div>
							<div className="p-5 rounded-xl border border-dashed border-white/10 bg-white/5">
								<p className="text-sm leading-relaxed text-white/60 italic">
									&quot;황소자리의 중천(Midheaven)은 지속적인
									가치를 구축하는 데 초점을 맞춘 직업 경로를
									시사합니다. 당신은 미적 감각과 실용적인
									안정성이 모두 필요한 환경에서 번영합니다. AI
									분석은 천왕성이 10하우스를 통과하는 2025년
									말, 기술 지향적이거나 파격적인 역할로의 큰
									직업적 전환을 예측합니다.&quot;
								</p>
							</div>
						</section>

						{/* Interaction Buttons */}
						<div className="mt-4 flex gap-4">
							<button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
								<span className="material-symbols-outlined">
									chat
								</span>
								AI 비서에게 질문하기
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
