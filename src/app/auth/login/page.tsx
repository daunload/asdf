import { Suspense } from 'react';
import { LoginPage } from '@/page-components/auth/login/ui';

export default function Login() {
	return (
		<Suspense fallback={<div>로딩 중...</div>}>
			<LoginPage />
		</Suspense>
	);
}
