import { MappedRow, ParsedRow, StandardField } from './types';

const synonymMap: Record<StandardField, string[]> = {
  orders: ['orders', 'order count', '订单', '订单数', 'orders qty', 'units sold'],
  gmv: ['gmv', 'revenue', 'sales', '成交额', '销售额', '销售', 'total sales'],
  ad_spend: ['ad spend', 'ads cost', '广告花费', 'ppc spend', 'ad cost', '广告费'],
  sessions: ['sessions', 'traffic', 'visits', '访问量', '访客', '访客数'],
  profit: ['profit', 'net profit', '利润', '净利润'],
  cogs: ['cogs', 'cost of goods', '货品成本', '采购成本', 'product cost'],
  returns: ['returns', 'refund', '退货', '退款', 'return units'],
  clicks: ['clicks', 'ad clicks', '点击', '点击量'],
  impressions: ['impressions', '曝光', '曝光量', 'ad impressions'],
  units: ['units', 'units sold', '销量', '件数', 'sold units']
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[()（）\[\]{}]/g, '')
    .replace(/[\s_\-\/]+/g, '')
    .replace(/[：:]/g, '');
}

function toNumber(input: unknown): number {
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;
  const text = String(input ?? '').trim();
  if (!text) return 0;
  const isPercent = text.includes('%');
  const cleaned = text.replace(/[$¥€£,%\s]/g, '').replace(/,/g, '');
  const num = Number(cleaned);
  if (!Number.isFinite(num)) return 0;
  return isPercent ? num / 100 : num;
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.88;
  const min = Math.min(a.length, b.length);
  let same = 0;
  for (let i = 0; i < min; i++) {
    if (a[i] === b[i]) same++;
  }
  return same / Math.max(a.length, b.length);
}

export function mapFields(rows: ParsedRow[]): {
  mappedRows: MappedRow[];
  mapping: Partial<Record<StandardField, string>>;
  warnings: string[];
} {
  const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const normalizedHeaders = headers.map((h) => ({ raw: h, norm: normalize(h) }));

  const mapping: Partial<Record<StandardField, string>> = {};

  for (const field of Object.keys(synonymMap) as StandardField[]) {
    let best: { raw: string; score: number } | null = null;
    for (const header of normalizedHeaders) {
      for (const syn of synonymMap[field]) {
        const score = similarity(header.norm, normalize(syn));
        if (!best || score > best.score) {
          best = { raw: header.raw, score };
        }
      }
    }
    if (best && best.score >= 0.7) mapping[field] = best.raw;
  }

  const warnings: string[] = [];
  (['orders', 'gmv', 'ad_spend', 'sessions'] as StandardField[]).forEach((field) => {
    if (!mapping[field]) warnings.push(`Missing key field mapping: ${field}`);
  });

  const mappedRows: MappedRow[] = rows.map((row) => {
    const mapped = {} as MappedRow;
    for (const field of Object.keys(synonymMap) as StandardField[]) {
      mapped[field] = toNumber(mapping[field] ? row[mapping[field] as string] : 0);
    }
    return mapped;
  });

  return { mappedRows, mapping, warnings };
}
