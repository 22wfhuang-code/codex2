'use client';

import { useRef, useState } from 'react';
import { AnalysisResult } from '@/lib/types';

type Props = {
  onDone: (result: AnalysisResult) => void;
  sampleLabel: string;
  analyzingLabel: string;
};

export default function FileUploader({ onDone, sampleLabel, analyzingLabel }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyze = async (file: File) => {
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    });

    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? 'Analyze failed');
      setLoading(false);
      return;
    }

    onDone(payload as AnalysisResult);
    setLoading(false);
  };

  const onSample = async () => {
    const response = await fetch('/sample.csv');
    const text = await response.text();
    const file = new File([text], 'sample.csv', { type: 'text/csv' });
    await analyze(file);
  };

  return (
    <div className="rounded-xl border border-dashed border-slate-400 bg-white p-6">
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls,.txt"
        className="mb-4 block w-full text-sm"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) analyze(file);
        }}
      />
      <div className="flex gap-3">
        <button
          className="rounded-lg border border-slate-300 px-4 py-2"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          Upload
        </button>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-white" onClick={onSample} type="button">
          {sampleLabel}
        </button>
      </div>
      {loading && <p className="mt-3 text-sm text-blue-700">{analyzingLabel}</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
