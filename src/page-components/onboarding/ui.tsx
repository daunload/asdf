'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { submitOnboarding } from '@/features/onboarding/actions';

export function OnboardingPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const step = parseInt(searchParams.get('step') || '1', 10);

	const [birthDate, setBirthDate] = useState({
		year: '',
		month: '',
		day: '',
	});
	const [birthTime, setBirthTime] = useState({
		hour: '',
		minute: '',
	});
	const [isTimeUnknown, setIsTimeUnknown] = useState(false);
	const [birthPlace, setBirthPlace] = useState('');
	const [error, setError] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// 세션 스토리지에서 입력값 복원
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// 생년월일 복원
			const savedDate = sessionStorage.getItem('birthDate');
			if (savedDate && step === 1) {
				const [year, month, day] = savedDate.split('-');
				setBirthDate({ year, month, day });
			}

			// 시간 복원
			const savedTime = sessionStorage.getItem('birthTime');
			if (savedTime && step === 2) {
				if (savedTime === 'unknown') {
					setIsTimeUnknown(true);
				} else {
					const [hour, minute] = savedTime.split(':');
					setBirthTime({ hour, minute });
				}
			}

			// 장소 복원
			const savedPlace = sessionStorage.getItem('birthPlace');
			if (savedPlace && step === 3) {
				setBirthPlace(savedPlace);
			}
		}
	}, [step]);

	// 날짜 유효성 검사
	useEffect(() => {
		if (birthDate.year && birthDate.month && birthDate.day) {
			const year = parseInt(birthDate.year, 10);
			const month = parseInt(birthDate.month, 10);
			const day = parseInt(birthDate.day, 10);

			// 기본 유효성 검사
			if (year < 1900 || year > new Date().getFullYear()) {
				setError('유효한 연도를 입력해주세요.');
				setIsValid(false);
				return;
			}

			if (month < 1 || month > 12) {
				setError('유효한 월을 입력해주세요.');
				setIsValid(false);
				return;
			}

			if (day < 1 || day > 31) {
				setError('유효한 일을 입력해주세요.');
				setIsValid(false);
				return;
			}

			// 실제 날짜 유효성 검사
			const date = new Date(year, month - 1, day);
			if (
				date.getFullYear() !== year ||
				date.getMonth() !== month - 1 ||
				date.getDate() !== day
			) {
				setError('유효하지 않은 날짜입니다.');
				setIsValid(false);
				return;
			}

			// 미래 날짜 체크
			if (date > new Date()) {
				setError('미래 날짜는 입력할 수 없습니다.');
				setIsValid(false);
				return;
			}

			setError('');
			setIsValid(true);
		} else {
			setError('');
			setIsValid(false);
		}
	}, [birthDate]);

	// 시간 유효성 검사 (스텝 2)
	useEffect(() => {
		if (step === 2) {
			if (isTimeUnknown) {
				// "시간 모름" 선택 시 항상 유효
				setError('');
				setIsValid(true);
			} else if (birthTime.hour && birthTime.minute) {
				const hour = parseInt(birthTime.hour, 10);
				const minute = parseInt(birthTime.minute, 10);

				if (hour < 0 || hour > 23) {
					setError('유효한 시간(0-23)을 입력해주세요.');
					setIsValid(false);
					return;
				}

				if (minute < 0 || minute > 59) {
					setError('유효한 분(0-59)을 입력해주세요.');
					setIsValid(false);
					return;
				}

				setError('');
				setIsValid(true);
			} else {
				setError('');
				setIsValid(false);
			}
		}
	}, [step, birthTime, isTimeUnknown]);

	// 장소 유효성 검사 (스텝 3)
	useEffect(() => {
		if (step === 3) {
			const trimmedPlace = birthPlace.trim();
			if (trimmedPlace.length >= 2) {
				setError('');
				setIsValid(true);
			} else if (trimmedPlace.length > 0) {
				setError('장소는 최소 2자 이상 입력해주세요.');
				setIsValid(false);
			} else {
				setError('');
				setIsValid(false);
			}
		}
	}, [step, birthPlace]);

	const handleNext = () => {
		if (step === 1 && isValid) {
			// 입력값을 세션 스토리지에 저장
			const dateString = `${birthDate.year}-${birthDate.month.padStart(2, '0')}-${birthDate.day.padStart(2, '0')}`;
			sessionStorage.setItem('birthDate', dateString);

			// 다음 스텝으로 이동
			router.push('/onboarding?step=2');
		} else if (step === 2 && isValid) {
			// 시간 또는 "시간 모름" 저장
			if (isTimeUnknown) {
				sessionStorage.setItem('birthTime', 'unknown');
			} else {
				const timeString = `${birthTime.hour.padStart(2, '0')}:${birthTime.minute.padStart(2, '0')}`;
				sessionStorage.setItem('birthTime', timeString);
			}

			// 다음 스텝으로 이동
			router.push('/onboarding?step=3');
		} else if (step === 3 && isValid) {
			// 장소 저장
			sessionStorage.setItem('birthPlace', birthPlace.trim());

			// Server Action 호출하여 제출
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		if (isSubmitting) return;

		setIsSubmitting(true);
		setError('');

		try {
			// 세션 스토리지에서 모든 입력값 가져오기
			const savedDate = sessionStorage.getItem('birthDate');
			const savedTime = sessionStorage.getItem('birthTime') || 'unknown';
			const savedPlace = sessionStorage.getItem('birthPlace');

			if (!savedDate || !savedPlace) {
				setError('필수 정보가 누락되었습니다.');
				setIsSubmitting(false);
				return;
			}

			// Server Action 호출
			const result = await submitOnboarding({
				birthDate: savedDate,
				birthTime: savedTime,
				birthPlace: savedPlace,
			});

			// 에러가 있으면 표시 (redirect가 발생하지 않은 경우)
			if (result && !result.success) {
				setError(
					result.error || '온보딩 정보 저장 중 오류가 발생했습니다.',
				);
				setIsSubmitting(false);
			}
			// 성공 시 redirect가 발생하므로 여기까지 오지 않음
		} catch (err: any) {
			// NEXT_REDIRECT 에러는 정상적인 리다이렉트이므로 무시
			if (err?.digest?.startsWith('NEXT_REDIRECT')) {
				// 리다이렉트가 발생했으므로 아무것도 하지 않음
				return;
			}

			console.error('온보딩 제출 오류:', err);
			setError(
				'온보딩 정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.',
			);
			setIsSubmitting(false);
		}
	};

	// 스텝 1: 생년월일 입력
	if (step === 1) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md">
					<div className="space-y-8">
						{/* 제목 */}
						<div className="text-center">
							<h1 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
								생년월일을 입력해주세요
							</h1>
							<p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
								출생 차트 계산에 필요한 정보입니다
							</p>
						</div>

						{/* 생년월일 입력 폼 */}
						<div className="space-y-4">
							<div className="grid grid-cols-3 gap-4">
								{/* 연도 */}
								<div>
									<label
										htmlFor="year"
										className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
									>
										연도
									</label>
									<Input
										id="year"
										type="number"
										placeholder="YYYY"
										min="1900"
										max={new Date().getFullYear()}
										value={birthDate.year}
										onChange={(e) =>
											setBirthDate({
												...birthDate,
												year: e.target.value,
											})
										}
										className="w-full"
										aria-label="출생 연도"
										aria-invalid={
											error && error.includes('연도')
												? 'true'
												: 'false'
										}
										aria-describedby={
											error && error.includes('연도')
												? 'error-message'
												: undefined
										}
									/>
								</div>

								{/* 월 */}
								<div>
									<label
										htmlFor="month"
										className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
									>
										월
									</label>
									<Input
										id="month"
										type="number"
										placeholder="MM"
										min="1"
										max="12"
										value={birthDate.month}
										onChange={(e) =>
											setBirthDate({
												...birthDate,
												month: e.target.value,
											})
										}
										className="w-full"
										aria-label="출생 월"
										aria-invalid={
											error && error.includes('월')
												? 'true'
												: 'false'
										}
										aria-describedby={
											error && error.includes('월')
												? 'error-message'
												: undefined
										}
									/>
								</div>

								{/* 일 */}
								<div>
									<label
										htmlFor="day"
										className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
									>
										일
									</label>
									<Input
										id="day"
										type="number"
										placeholder="DD"
										min="1"
										max="31"
										value={birthDate.day}
										onChange={(e) =>
											setBirthDate({
												...birthDate,
												day: e.target.value,
											})
										}
										className="w-full"
										aria-label="출생 일"
										aria-invalid={
											(error && error.includes('일')) ||
											error.includes('날짜')
												? 'true'
												: 'false'
										}
										aria-describedby={
											error &&
											(error.includes('일') ||
												error.includes('날짜'))
												? 'error-message'
												: undefined
										}
									/>
								</div>
							</div>

							{/* 에러 메시지 */}
							{error && (
								<p
									id="error-message"
									className="text-sm text-red-600 dark:text-red-400"
									role="alert"
									aria-live="polite"
								>
									{error}
								</p>
							)}
						</div>

						{/* 다음 버튼 */}
						<div className="flex justify-center">
							<Button
								onClick={handleNext}
								disabled={!isValid}
								size="lg"
								variant="default"
								className="min-h-[44px] min-w-[120px]"
							>
								다음
							</Button>
						</div>
					</div>
				</main>
			</div>
		);
	}

	// 스텝 2: 출생 시간 입력 또는 "시간 모름"
	if (step === 2) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md">
					<div className="space-y-8">
						{/* 제목 */}
						<div className="text-center">
							<h1 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
								출생 시간을 입력해주세요
							</h1>
							<p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
								시간을 모르시면 "시간 모름"을 선택하세요
							</p>
						</div>

						{/* 시간 입력 폼 */}
						<div className="space-y-6">
							{/* 시간 입력 필드 */}
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									{/* 시 */}
									<div>
										<label
											htmlFor="hour"
											className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
										>
											시
										</label>
										<Input
											id="hour"
											type="number"
											placeholder="HH"
											min="0"
											max="23"
											value={birthTime.hour}
											onChange={(e) => {
												setBirthTime({
													...birthTime,
													hour: e.target.value,
												});
												setIsTimeUnknown(false);
											}}
											disabled={isTimeUnknown}
											className="w-full"
											aria-label="출생 시"
											aria-invalid={
												error && error.includes('시간')
													? 'true'
													: 'false'
											}
											aria-describedby={
												error && error.includes('시간')
													? 'error-message'
													: undefined
											}
										/>
									</div>

									{/* 분 */}
									<div>
										<label
											htmlFor="minute"
											className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
										>
											분
										</label>
										<Input
											id="minute"
											type="number"
											placeholder="MM"
											min="0"
											max="59"
											value={birthTime.minute}
											onChange={(e) => {
												setBirthTime({
													...birthTime,
													minute: e.target.value,
												});
												setIsTimeUnknown(false);
											}}
											disabled={isTimeUnknown}
											className="w-full"
											aria-label="출생 분"
											aria-invalid={
												error && error.includes('분')
													? 'true'
													: 'false'
											}
											aria-describedby={
												error && error.includes('분')
													? 'error-message'
													: undefined
											}
										/>
									</div>
								</div>

								{/* 에러 메시지 */}
								{error && (
									<p
										id="error-message"
										className="text-sm text-red-600 dark:text-red-400"
										role="alert"
										aria-live="polite"
									>
										{error}
									</p>
								)}
							</div>

							{/* "시간 모름" 옵션 */}
							<div className="space-y-3">
								<label className="flex items-center space-x-3 cursor-pointer">
									<input
										type="checkbox"
										checked={isTimeUnknown}
										onChange={(e) => {
											setIsTimeUnknown(e.target.checked);
											if (e.target.checked) {
												setBirthTime({
													hour: '',
													minute: '',
												});
												setError('');
											}
										}}
										className="w-5 h-5 rounded border-gray-300 text-black focus:ring-2 focus:ring-black dark:border-gray-700 dark:focus:ring-white"
										aria-label="출생 시간 모름"
									/>
									<span className="text-base font-medium text-zinc-700 dark:text-zinc-300">
										시간을 모릅니다
									</span>
								</label>

								{/* "시간 모름" 선택 시 안내 문구 */}
								{isTimeUnknown && (
									<div
										className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md"
										role="alert"
										aria-live="polite"
									>
										<p className="text-sm text-yellow-800 dark:text-yellow-200">
											시간을 모르면 제한된 해석만
											제공됩니다. 정확한 해석을 위해서는
											출생 시간이 필요합니다.
										</p>
									</div>
								)}
							</div>
						</div>

						{/* 다음 버튼 */}
						<div className="flex justify-center">
							<Button
								onClick={handleNext}
								disabled={!isValid}
								size="lg"
								variant="default"
								className="min-h-[44px] min-w-[120px]"
							>
								다음
							</Button>
						</div>
					</div>
				</main>
			</div>
		);
	}

	// 스텝 3: 출생 장소 입력
	if (step === 3) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
				<main className="mx-auto w-full max-w-md">
					<div className="space-y-8">
						{/* 제목 */}
						<div className="text-center">
							<h1 className="text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-4xl">
								출생 장소를 입력해주세요
							</h1>
							<p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
								출생 차트 계산에 필요한 정보입니다
							</p>
						</div>

						{/* 장소 입력 폼 */}
						<div className="space-y-4">
							<div>
								<label
									htmlFor="place"
									className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
								>
									출생 장소
								</label>
								<Input
									id="place"
									type="text"
									placeholder="예: 서울, 부산, New York 등"
									value={birthPlace}
									onChange={(e) =>
										setBirthPlace(e.target.value)
									}
									className="w-full"
									aria-label="출생 장소"
									aria-invalid={error ? 'true' : 'false'}
									aria-describedby={
										error ? 'error-message' : undefined
									}
								/>
							</div>

							{/* 에러 메시지 */}
							{error && (
								<p
									id="error-message"
									className="text-sm text-red-600 dark:text-red-400"
									role="alert"
									aria-live="polite"
								>
									{error}
								</p>
							)}
						</div>

						{/* 에러 메시지 (제출 에러) */}
						{error && step === 3 && (
							<p
								className="text-sm text-red-600 dark:text-red-400 text-center"
								role="alert"
								aria-live="polite"
							>
								{error}
							</p>
						)}

						{/* 결과 보기 버튼 */}
						<div className="flex justify-center">
							<Button
								onClick={handleNext}
								disabled={!isValid || isSubmitting}
								size="lg"
								variant="default"
								className="min-h-[44px] min-w-[120px]"
							>
								{isSubmitting ? '처리 중...' : '결과 보기'}
							</Button>
						</div>
					</div>
				</main>
			</div>
		);
	}

	// 다른 스텝은 다음 스토리에서 구현
	return (
		<div className="flex min-h-screen items-center justify-center">
			<p className="text-zinc-600 dark:text-zinc-400">
				스텝 {step}은 다음 스토리에서 구현됩니다.
			</p>
		</div>
	);
}
