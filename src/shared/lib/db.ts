/**
 * Prisma 클라이언트 singleton
 * 
 * 개발 환경에서 hot reload 시 Prisma 클라이언트 인스턴스가 여러 개 생성되는 것을 방지합니다.
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
