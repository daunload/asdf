import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { StepLayout } from '@/shared/ui/file-step-layout';
import { BirthDate } from '../model/use-onboarding';

interface StepBirthDateProps {
	birthDate: BirthDate;
	setBirthDate: (date: BirthDate) => void;
	error: string;
	isValid: boolean;
	onNext: () => void;
}

export function StepBirthDate({
	birthDate,
	setBirthDate,
	error,
	isValid,
	onNext,
}: StepBirthDateProps) {
	return (
		<StepLayout
			title="생년월일을 입력해주세요"
			description="출생 차트 계산에 필요한 정보입니다"
			footer={
				<Button
					onClick={onNext}
					disabled={!isValid}
					size="lg"
					variant="default"
					className="min-h-[44px] min-w-[120px]"
				>
					다음
				</Button>
			}
		>
			<div className="space-y-4">
				<div className="grid grid-cols-3 gap-4">
					{/* Year */}
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
						/>
					</div>

					{/* Month */}
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
								error && error.includes('월') ? 'true' : 'false'
							}
						/>
					</div>

					{/* Day */}
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
						/>
					</div>
				</div>

				{/* Error Message */}
				{error && (
					<p
						className="text-sm text-red-600 dark:text-red-400"
						role="alert"
						aria-live="polite"
					>
						{error}
					</p>
				)}
			</div>
		</StepLayout>
	);
}
