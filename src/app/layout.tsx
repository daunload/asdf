import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/widgets/header/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'natalchart - 출생 차트와 LLM 해석',
  description:
    '출생 차트와 LLM 해석을 한 화면에 한 주제로 제공하는 서비스. GPT보다 나를 잘 아는 출생 차트 해석을 경험하세요.',
  openGraph: {
    title: 'natalchart - 출생 차트와 LLM 해석',
    description:
      '출생 차트와 LLM 해석을 한 화면에 한 주제로 제공하는 서비스. GPT보다 나를 잘 아는 출생 차트 해석을 경험하세요.',
    type: 'website',
    // og:image는 이후 추가 가능
  },
  twitter: {
    card: 'summary_large_image',
    title: 'natalchart - 출생 차트와 LLM 해석',
    description:
      '출생 차트와 LLM 해석을 한 화면에 한 주제로 제공하는 서비스. GPT보다 나를 잘 아는 출생 차트 해석을 경험하세요.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
