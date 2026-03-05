'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import DiagnosisList from '@/components/DiagnosisList';
import ExportButton from '@/components/ExportButton';
import LangToggle from '@/components/LangToggle';
import MetricCards from '@/components/MetricCards';
import Plan7Days from '@/components/Plan7Days';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { AnalysisResult } from '@/lib/types';

export default function ReportPage() {
  const { lang } = useLang();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('analysis_result');
    if (raw) setResult(JSON.parse(raw) as AnalysisResult);
  }, []);

  const aiKeyEnabled = useMemo(() => Boolean(process.env.NEXT_PUBLIC_HAS_OPENAI_KEY === 'true'), []);

  if (!result) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <p>{t(lang, 'noData')}</p>
        <Link href="/upload" className="mt-3 inline-block text-blue-600 underline">
          {t(lang, 'backUpload')}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t(lang, 'appName')}</h1>
        <LangToggle />
      </div>

      {!aiKeyEnabled && <p className="text-sm text-amber-700">{t(lang, 'aiDisabled')}</p>}

      <section>
        <h2 className="mb-3 text-xl font-semibold">{t(lang, 'metrics')}</h2>
        <MetricCards metrics={result.metrics} />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">{t(lang, 'diagnoses')}</h2>
        <DiagnosisList diagnoses={result.diagnoses} />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">{t(lang, 'plan')}</h2>
        <Plan7Days plan={result.plan} />
      </section>

      <div className="flex items-center gap-3">
        <ExportButton result={result} label={t(lang, 'export')} />
        <Link href="/upload" className="text-blue-600 underline">
          {t(lang, 'backUpload')}
        </Link>
      </div>
    </main>
  );
}
