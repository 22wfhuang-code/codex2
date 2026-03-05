'use client';

import { AnalysisResult } from '@/lib/types';

export default function ExportButton({ result, label }: { result: AnalysisResult; label: string }) {
  const onExport = async () => {
    const response = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    });

    if (!response.ok) return;

    const text = await response.text();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnosis-report.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="rounded-lg bg-slate-900 px-4 py-2 text-white" onClick={onExport} type="button">
      {label}
    </button>
  );
}
