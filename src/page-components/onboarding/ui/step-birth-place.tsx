import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { StepLayout } from '@/shared/ui/file-step-layout';

interface StepBirthPlaceProps {
	birthPlace: string;
	setBirthPlace: (place: string) => void;
	error: string;
	isValid: boolean;
	isSubmitting: boolean;
	onNext: () => void;
}

export function StepBirthPlace({
	birthPlace,
	setBirthPlace,
	error,
	isValid,
	isSubmitting,
	onNext,
}: StepBirthPlaceProps) {
	return (
		<StepLayout
			title="출생 장소를 입력해주세요"
			description="출생 차트 계산에 필요한 정보입니다"
			footer={
				<Button
					onClick={onNext}
					disabled={!isValid || isSubmitting}
					size="lg"
					variant="default"
					className="min-h-[44px] min-w-[120px]"
				>
					{isSubmitting ? '처리 중...' : '결과 보기'}
				</Button>
			}
		>
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
						onChange={(e) => setBirthPlace(e.target.value)}
						className="w-full"
						aria-label="출생 장소"
						aria-invalid={error ? 'true' : 'false'}
					/>
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
