import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/layout/BottomNav';

export const metadata: Metadata = {
  title: '마감할인',
  description: '마감 할인 픽업 플랫폼 - 오늘/내일 픽업 가능한 할인 상품을 찾아보세요',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '마감할인',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const naverClientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

  return (
    <html lang="ko">
      <head>
        {naverClientId && (
          <script
            type="text/javascript"
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverClientId}&submodules=geocoder,reverseGeocode`}
          />
        )}
      </head>
      <body className="font-sans antialiased bg-gray-50">
        <div className="min-h-screen max-w-lg mx-auto bg-white">
          <main className="pb-32">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
