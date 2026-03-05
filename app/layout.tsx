import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/components/LangProvider';

export const metadata: Metadata = {
  title: 'Amazon 店铺数据诊断器',
  description: '上传 CSV/XLSX 获取指标、诊断与7天优化计划'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
