import { MappedRow, Metrics } from './types';

const sum = (rows: MappedRow[], key: keyof MappedRow) => rows.reduce((acc, cur) => acc + (cur[key] ?? 0), 0);
const div = (a: number, b: number): number | null => (b > 0 ? a / b : null);

export function computeMetrics(rows: MappedRow[]): Metrics {
  const gmv = sum(rows, 'gmv');
  const orders = sum(rows, 'orders');
  const adSpend = sum(rows, 'ad_spend');
  const sessions = sum(rows, 'sessions');
  const profit = sum(rows, 'profit');
  const cogs = sum(rows, 'cogs');
  const returns = sum(rows, 'returns');
  const clicks = sum(rows, 'clicks');
  const impressions = sum(rows, 'impressions');
  const units = sum(rows, 'units');

  return {
    gmv,
    orders,
    adSpend,
    profit,
    cogs,
    returns,
    sessions,
    clicks,
    impressions,
    units,
    grossMargin: div(gmv - cogs, gmv),
    netMargin: div(profit, gmv),
    acos: div(adSpend, gmv),
    tacos: div(adSpend, gmv),
    roas: div(gmv, adSpend),
    roi: div(profit, cogs + adSpend),
    conversionRate: div(orders, sessions),
    ctr: div(clicks, impressions),
    cpc: div(adSpend, clicks),
    aov: div(gmv, orders),
    returnRate: div(returns, orders)
  };
}
