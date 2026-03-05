'use client';

import { useRouter } from 'next/navigation';
import FileUploader from '@/components/FileUploader';
import LangToggle from '@/components/LangToggle';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { AnalysisResult } from '@/lib/types';

export default function UploadPage() {
  const { lang } = useLang();
  const router = useRouter();

  const handleDone = (result: AnalysisResult) => {
    localStorage.setItem('analysis_result', JSON.stringify(result));
    router.push('/report');
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t(lang, 'uploadTitle')}</h1>
        <LangToggle />
      </div>
      <p className="mb-6 text-slate-600">{t(lang, 'uploadDesc')}</p>
      <FileUploader onDone={handleDone} sampleLabel={t(lang, 'useSample')} analyzingLabel={t(lang, 'analyzing')} />
    </main>
  );
}
