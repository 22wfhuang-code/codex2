'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Lang } from '@/lib/types';

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    const stored = window.localStorage.getItem('lang');
    if (stored === 'zh' || stored === 'en') {
      setLangState(stored);
    }
  }, []);

  const setLang = (value: Lang) => {
    setLangState(value);
    window.localStorage.setItem('lang', value);
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang must be used within LangProvider');
  }
  return ctx;
}
