import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { submitOnboarding } from '@/features/onboarding/actions';

export interface BirthDate {
	year: string;
	month: string;
	day: string;
}

export interface BirthTime {
	hour: string;
	minute: string;
}

export function useOnboarding() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const step = parseInt(searchParams.get('step') || '1', 10);

	const [birthDate, setBirthDate] = useState<BirthDate>({
		year: '',
		month: '',
		day: '',
	});
	const [birthTime, setBirthTime] = useState<BirthTime>({
		hour: '',
		minute: '',
	});
	const [isTimeUnknown, setIsTimeUnknown] = useState(false);
	const [birthPlace, setBirthPlace] = useState('');
	const [error, setError] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Load from Session Storage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedDate = sessionStorage.getItem('birthDate');
			if (savedDate && step === 1) {
				const [year, month, day] = savedDate.split('-');
				setBirthDate({ year, month, day });
			}

			const savedTime = sessionStorage.getItem('birthTime');
			if (savedTime && step === 2) {
				if (savedTime === 'unknown') {
					setIsTimeUnknown(true);
				} else {
					const [hour, minute] = savedTime.split(':');
					setBirthTime({ hour, minute });
				}
			}

			const savedPlace = sessionStorage.getItem('birthPlace');
			if (savedPlace && step === 3) {
				setBirthPlace(savedPlace);
			}
		}
	}, [step]);

	// Validation Logic
	useEffect(() => {
		setError('');
		setIsValid(false);

		// Step 1: Birth Date
		if (step === 1) {
			if (birthDate.year && birthDate.month && birthDate.day) {
				const year = parseInt(birthDate.year, 10);
				const month = parseInt(birthDate.month, 10);
				const day = parseInt(birthDate.day, 10);

				if (year < 1900 || year > new Date().getFullYear()) {
					setError('유효한 연도를 입력해주세요.');
					return;
				}
				if (month < 1 || month > 12) {
					setError('유효한 월을 입력해주세요.');
					return;
				}
				if (day < 1 || day > 31) {
					setError('유효한 일을 입력해주세요.');
					return;
				}

				const date = new Date(year, month - 1, day);
				if (
					date.getFullYear() !== year ||
					date.getMonth() !== month - 1 ||
					date.getDate() !== day
				) {
					setError('유효하지 않은 날짜입니다.');
					return;
				}
				if (date > new Date()) {
					setError('미래 날짜는 입력할 수 없습니다.');
					return;
				}

				setIsValid(true);
			}
		}

		// Step 2: Birth Time
		if (step === 2) {
			if (isTimeUnknown) {
				setIsValid(true);
			} else if (birthTime.hour && birthTime.minute) {
				const hour = parseInt(birthTime.hour, 10);
				const minute = parseInt(birthTime.minute, 10);

				if (hour < 0 || hour > 23) {
					setError('유효한 시간(0-23)을 입력해주세요.');
					return;
				}
				if (minute < 0 || minute > 59) {
					setError('유효한 분(0-59)을 입력해주세요.');
					return;
				}
				setIsValid(true);
			}
		}

		// Step 3: Birth Place
		if (step === 3) {
			const trimmedPlace = birthPlace.trim();
			if (trimmedPlace.length >= 2) {
				setIsValid(true);
			} else if (trimmedPlace.length > 0) {
				setError('장소는 최소 2자 이상 입력해주세요.');
			}
		}
	}, [step, birthDate, birthTime, isTimeUnknown, birthPlace]);

	const handleNext = () => {
		if (step === 1 && isValid) {
			const dateString = `${birthDate.year}-${birthDate.month.padStart(2, '0')}-${birthDate.day.padStart(2, '0')}`;
			sessionStorage.setItem('birthDate', dateString);
			router.push('/onboarding?step=2');
		} else if (step === 2 && isValid) {
			if (isTimeUnknown) {
				sessionStorage.setItem('birthTime', 'unknown');
			} else {
				const timeString = `${birthTime.hour.padStart(2, '0')}:${birthTime.minute.padStart(2, '0')}`;
				sessionStorage.setItem('birthTime', timeString);
			}
			router.push('/onboarding?step=3');
		} else if (step === 3 && isValid) {
			sessionStorage.setItem('birthPlace', birthPlace.trim());
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		setError('');

		try {
			const savedDate = sessionStorage.getItem('birthDate');
			const savedTime = sessionStorage.getItem('birthTime') || 'unknown';
			const savedPlace = sessionStorage.getItem('birthPlace');

			if (!savedDate || !savedPlace) {
				setError('필수 정보가 누락되었습니다.');
				setIsSubmitting(false);
				return;
			}

			const result = await submitOnboarding({
				birthDate: savedDate,
				birthTime: savedTime,
				birthPlace: savedPlace,
			});

			if (result && !result.success) {
				setError(
					result.error || '온보딩 정보 저장 중 오류가 발생했습니다.',
				);
				setIsSubmitting(false);
			}
		} catch (err: any) {
			if (err?.digest?.startsWith('NEXT_REDIRECT')) {
				return;
			}
			console.error('온보딩 제출 오류:', err);
			setError(
				'온보딩 정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.',
			);
			setIsSubmitting(false);
		}
	};

	return {
		step,
		birthDate,
		setBirthDate,
		birthTime,
		setBirthTime,
		isTimeUnknown,
		setIsTimeUnknown,
		birthPlace,
		setBirthPlace,
		error,
		isValid,
		isSubmitting,
		handleNext,
	};
}
