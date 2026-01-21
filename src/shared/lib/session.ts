/**
 * 서버 사이드 세션 유틸리티
 * 
 * Next.js App Router에서 서버 컴포넌트에서 세션 정보를 가져오는 유틸리티
 */

import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

/**
 * 서버 사이드에서 현재 세션 가져오기
 * 
 * @returns 세션 정보 또는 null
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * 서버 사이드에서 현재 사용자 ID 가져오기
 * 
 * @returns 사용자 ID 또는 null
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id || null;
}
