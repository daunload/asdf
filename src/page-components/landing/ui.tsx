import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
      <main className="mx-auto w-full max-w-3xl text-center">
        {/* 서비스 소개 섹션 */}
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl lg:text-6xl">
            출생 차트와 LLM 해석을
            <br />
            한 화면에 한 주제로
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
            GPT보다 나를 잘 아는 출생 차트 해석. 한 화면에 한 주제씩, 심볼과 핵심 문장으로
            나를 발견하세요.
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="flex justify-center">
          <Link href="/onboarding">
            <Button
              size="lg"
              variant="default"
              className="min-h-[44px] min-w-[120px]"
            >
              시작하기
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
