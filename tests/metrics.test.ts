import { describe, expect, it } from 'vitest';
import { computeMetrics } from '@/lib/metrics';

describe('metrics', () => {
  it('computes derived metrics with graceful nulls', () => {
    const metrics = computeMetrics([
      {
        orders: 10,
        gmv: 200,
        ad_spend: 40,
        sessions: 100,
        profit: 20,
        cogs: 100,
        returns: 1,
        clicks: 50,
        impressions: 2000,
        units: 10
      }
    ]);

    expect(metrics.acos).toBeCloseTo(0.2);
    expect(metrics.roas).toBeCloseTo(5);
    expect(metrics.conversionRate).toBeCloseTo(0.1);
    expect(metrics.ctr).toBeCloseTo(0.025);
  });
});
