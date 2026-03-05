import { Metrics } from '@/lib/types';

function fmtValue(value: number | null): string {
  if (value === null) return 'N/A';
  return Number.isInteger(value) ? value.toString() : value.toFixed(4);
}

export default function MetricCards({ metrics }: { metrics: Metrics }) {
  const entries = Object.entries(metrics);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {entries.map(([key, value]) => (
        <div key={key} className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{key}</p>
          <p className="text-lg font-semibold">{fmtValue(typeof value === 'number' ? value : null)}</p>
        </div>
      ))}
    </div>
  );
}
