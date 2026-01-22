import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { StepLayout } from '@/shared/ui/file-step-layout';
import { BirthTime } from '../model/use-onboarding';

interface StepBirthTimeProps {
	birthTime: BirthTime;
	setBirthTime: (time: BirthTime) => void;
	isTimeUnknown: boolean;
	setIsTimeUnknown: (unknown: boolean) => void;
	error: string;
	isValid: boolean;
	onNext: () => void;
}

export function StepBirthTime({
	birthTime,
	setBirthTime,
	isTimeUnknown,
	setIsTimeUnknown,
	error,
	isValid,
	onNext,
}: StepBirthTimeProps) {
	return (
		<StepLayout
			title="출생 시간을 입력해주세요"
			description="시간을 모르시면 '시간 모름'을 선택하세요"
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
			<div className="space-y-6">
				{/* Time Inputs */}
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						{/* Hour */}
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
							/>
						</div>

						{/* Minute */}
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

				{/* Unknown Toggle */}
				<div className="space-y-3">
					<label className="flex items-center space-x-3 cursor-pointer">
						<input
							type="checkbox"
							checked={isTimeUnknown}
							onChange={(e) => {
								setIsTimeUnknown(e.target.checked);
								if (e.target.checked) {
									setBirthTime({ hour: '', minute: '' });
								}
							}}
							className="w-5 h-5 rounded border-gray-300 text-black focus:ring-2 focus:ring-black dark:border-gray-700 dark:focus:ring-white"
						/>
						<span className="text-base font-medium text-zinc-700 dark:text-zinc-300">
							시간을 모릅니다
						</span>
					</label>

					{isTimeUnknown && (
						<div
							className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md"
							role="alert"
						>
							<p className="text-sm text-yellow-800 dark:text-yellow-200">
								시간을 모르면 제한된 해석만 제공됩니다. 정확한
								해석을 위해서는 출생 시간이 필요합니다.
							</p>
						</div>
					)}
				</div>
			</div>
		</StepLayout>
	);
}
