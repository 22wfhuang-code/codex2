import { describe, expect, it } from 'vitest';
import { diagnose } from '@/lib/diagnose';
import { Metrics } from '@/lib/types';

const base: Metrics = {
  gmv: 1000,
  orders: 100,
  adSpend: 500,
  profit: -50,
  cogs: 900,
  returns: 20,
  sessions: 5000,
  clicks: 200,
  impressions: 50000,
  units: 100,
  grossMargin: 0.1,
  netMargin: -0.05,
  acos: 0.5,
  tacos: 0.5,
  roas: 2,
  roi: -0.04,
  conversionRate: 0.02,
  ctr: 0.004,
  cpc: 2.5,
  aov: 10,
  returnRate: 0.2
};

describe('diagnose', () => {
  it('returns multiple explainable rule outputs', () => {
    const list = diagnose(base, ['Missing key field mapping: sessions']);
    expect(list.length).toBeGreaterThanOrEqual(10);
    expect(list.some((x) => x.id === 'missing-data')).toBe(true);
    expect(list.some((x) => x.priority === 'P0')).toBe(true);
  });
});
