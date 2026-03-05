'use client';

import Link from 'next/link';
import LangToggle from '@/components/LangToggle';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

export default function HomePage() {
  const { lang } = useLang();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t(lang, 'appName')}</h1>
        <LangToggle />
      </div>
      <p className="mb-10 text-lg text-slate-600">{t(lang, 'homeDesc')}</p>
      <Link
        href="/upload"
        className="inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
      >
        {t(lang, 'start')}
      </Link>
    </main>
  );
}
