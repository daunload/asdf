import type { Metadata } from 'next';
/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/widgets/header/ui';
import { Footer } from '@/widgets/footer/ui';

export const metadata: Metadata = {
	title: 'CosmicAI | Birth Chart Analysis',
	description:
		'Unlock your cosmic blueprint with AI-powered natal chart analysis.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning className="dark">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body suppressHydrationWarning className="antialiased font-display">
				<div className="star-field" />
				<div className="nebula-glow" />
				<Providers>
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
