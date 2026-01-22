import { Suspense } from 'react';
import { OnboardingPage } from '@/page-components/onboarding/ui';

export default function Onboarding() {
	return (
		<Suspense fallback={<div>로딩 중...</div>}>
			<OnboardingPage />
		</Suspense>
	);
}
