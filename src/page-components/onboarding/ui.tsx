'use client';

import { useOnboarding } from './model/use-onboarding';
import { StepBirthDate } from './ui/step-birth-date';
import { StepBirthTime } from './ui/step-birth-time';
import { StepBirthPlace } from './ui/step-birth-place';

export function OnboardingPage() {
	const {
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
	} = useOnboarding();

	if (step === 1) {
		return (
			<StepBirthDate
				birthDate={birthDate}
				setBirthDate={setBirthDate}
				error={error}
				isValid={isValid}
				onNext={handleNext}
			/>
		);
	}

	if (step === 2) {
		return (
			<StepBirthTime
				birthTime={birthTime}
				setBirthTime={setBirthTime}
				isTimeUnknown={isTimeUnknown}
				setIsTimeUnknown={setIsTimeUnknown}
				error={error}
				isValid={isValid}
				onNext={handleNext}
			/>
		);
	}

	if (step === 3) {
		return (
			<StepBirthPlace
				birthPlace={birthPlace}
				setBirthPlace={setBirthPlace}
				error={error}
				isValid={isValid}
				isSubmitting={isSubmitting}
				onNext={handleNext}
			/>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<p className="text-zinc-600 dark:text-zinc-400">
				존재하지 않는 스텝입니다.
			</p>
		</div>
	);
}
