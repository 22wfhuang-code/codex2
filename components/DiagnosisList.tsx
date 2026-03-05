'use client';

import { useState } from 'react';
import { Diagnosis } from '@/lib/types';

export default function DiagnosisList({ diagnoses }: { diagnoses: Diagnosis[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {diagnoses.map((item) => (
        <div key={item.id} className="rounded-lg border bg-white p-4">
          <button
            type="button"
            className="flex w-full items-center justify-between text-left"
            onClick={() => setOpen(open === item.id ? null : item.id)}
          >
            <span className="font-semibold">
              [{item.priority}] {item.title}
            </span>
            <span>{open === item.id ? '-' : '+'}</span>
          </button>
          {open === item.id && (
            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <p>原因：{item.reason}</p>
              <p>证据：{item.evidence}</p>
              <p>建议：{item.suggestion}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
