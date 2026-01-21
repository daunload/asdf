'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface OnboardingData {
    birthDate: string; // YYYY-MM-DD 형식
    birthTime: string; // HH:MM 형식 또는 "unknown"
    birthPlace: string;
}

export async function submitOnboarding(data: OnboardingData) {
    // 유효성 검사
    if (!data.birthDate || !data.birthPlace) {
        return {
            error: '필수 정보가 누락되었습니다.',
            success: false,
        };
    }

    // 날짜 형식 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.birthDate)) {
        return {
            error: '유효하지 않은 날짜 형식입니다.',
            success: false,
        };
    }

    // 시간 형식 검증 (unknown이 아닌 경우)
    if (data.birthTime !== 'unknown') {
        const timeRegex = /^\d{2}:\d{2}$/;
        if (!timeRegex.test(data.birthTime)) {
            return {
                error: '유효하지 않은 시간 형식입니다.',
                success: false,
            };
        }
    }

    // 장소 최소 길이 검증
    if (data.birthPlace.trim().length < 2) {
        return {
            error: '장소는 최소 2자 이상 입력해주세요.',
            success: false,
        };
    }

    try {
        // 쿠키에 출생 정보 저장
        const cookieStore = await cookies();

        cookieStore.set('birthDate', data.birthDate, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7일
        });

        cookieStore.set('birthTime', data.birthTime, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7일
        });

        cookieStore.set('birthPlace', data.birthPlace.trim(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7일
        });
    } catch (error) {
        console.error('온보딩 제출 오류:', error);
        return {
            error: '온보딩 정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.',
            success: false,
        };
    }

    // /cards로 리다이렉트
    // redirect()는 내부적으로 특별한 에러를 throw하므로 try-catch 밖에서 호출
    redirect('/cards');
}
