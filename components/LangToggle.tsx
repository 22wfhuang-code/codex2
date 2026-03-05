'use client';

import { useLang } from './LangProvider';

export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-slate-300 bg-white text-sm">
      {(['zh', 'en'] as const).map((item) => (
        <button
          key={item}
          className={`px-3 py-1.5 ${lang === item ? 'bg-slate-900 text-white' : 'text-slate-700'}`}
          onClick={() => setLang(item)}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
