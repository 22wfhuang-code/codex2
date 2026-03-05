import { describe, expect, it } from 'vitest';
import { mapFields } from '@/lib/fieldMapper';

describe('field mapper', () => {
  it('maps multilingual headers and cleans values', () => {
    const rows = [
      {
        '订单数': '10',
        '销售额(¥)': '¥1,200.50',
        '广告花费': '$100',
        访问量: '500'
      }
    ];

    const { mappedRows, mapping } = mapFields(rows);

    expect(mapping.orders).toBe('订单数');
    expect(mapping.gmv).toBe('销售额(¥)');
    expect(mappedRows[0].gmv).toBeCloseTo(1200.5);
    expect(mappedRows[0].ad_spend).toBe(100);
  });
});
