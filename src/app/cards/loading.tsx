/**
 * /cards 페이지 로딩 상태
 * Next.js loading.tsx는 자동으로 Suspense 경계를 생성합니다.
 */

export default function CardsLoading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-16 dark:bg-black sm:px-6 lg:px-8">
            <main className="mx-auto w-full max-w-md text-center">
                <div className="space-y-8">
                    {/* 스피너 */}
                    <div className="flex justify-center">
                        <div
                            className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white"
                            role="status"
                            aria-label="로딩 중"
                        >
                            <span className="sr-only">로딩 중...</span>
                        </div>
                    </div>

                    {/* 진행 문구 */}
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                            해석을 만들고 있어요
                        </h2>
                        <p className="text-base text-zinc-600 dark:text-zinc-400">
                            출생차트를 계산하고 카드를 생성하는 중입니다...
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
