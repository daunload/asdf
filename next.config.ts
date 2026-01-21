import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App Router 사용, Pages Router 비활성화
  // FSD의 pages 레이어는 컴포넌트 폴더로만 사용
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
