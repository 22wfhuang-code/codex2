import { Diagnosis, Metrics } from './types';

function fmtPct(v: number | null): string {
  return v === null ? 'N/A' : `${(v * 100).toFixed(2)}%`;
}

function fmtNum(v: number): string {
  return v.toFixed(2);
}

export function diagnose(metrics: Metrics, warnings: string[]): Diagnosis[] {
  const rules: Diagnosis[] = [];

  if (metrics.netMargin !== null && metrics.netMargin < 0) {
    rules.push({
      id: 'negative-net-margin',
      title: '净利为负 / Negative Net Margin',
      reason: '利润为负，说明成本和投放超过了销售贡献。',
      evidence: `netMargin=${fmtPct(metrics.netMargin)}, profit=${fmtNum(metrics.profit)}`,
      suggestion: '立刻缩减亏损关键词和无效投放，先止损再优化。',
      priority: 'P0'
    });
  }
  if (metrics.grossMargin !== null && metrics.grossMargin < 0.2) {
    rules.push({
      id: 'low-gross-margin',
      title: '毛利不足 / Low Gross Margin',
      reason: '货品成本占比过高，导致可用于营销与运营的空间不足。',
      evidence: `grossMargin=${fmtPct(metrics.grossMargin)}, cogs=${fmtNum(metrics.cogs)}`,
      suggestion: '优化供应链和定价，设置最低毛利红线。',
      priority: 'P1'
    });
  }
  if (metrics.acos !== null && metrics.acos > 0.35) {
    rules.push({
      id: 'high-acos',
      title: 'ACOS 过高 / High ACOS',
      reason: '广告花费占销售比例过高，盈利压力大。',
      evidence: `ACOS=${fmtPct(metrics.acos)}, adSpend=${fmtNum(metrics.adSpend)}`,
      suggestion: '分层关键词出价，暂停高花费低转化词。',
      priority: 'P0'
    });
  }
  if (metrics.roas !== null && metrics.roas < 2.5) {
    rules.push({
      id: 'low-roas',
      title: 'ROAS 偏低 / Low ROAS',
      reason: '投放回报不足，广告资金效率低。',
      evidence: `ROAS=${fmtNum(metrics.roas)}`,
      suggestion: '重构广告结构，提升高意图词预算占比。',
      priority: 'P1'
    });
  }
  if (metrics.conversionRate !== null && metrics.conversionRate < 0.08) {
    rules.push({
      id: 'low-conversion',
      title: '转化率过低 / Low Conversion Rate',
      reason: '流量未有效转化为订单，可能与 Listing、价格、评价有关。',
      evidence: `CVR=${fmtPct(metrics.conversionRate)}, sessions=${fmtNum(metrics.sessions)}`,
      suggestion: '优化主图/标题/卖点，校准价格与优惠。',
      priority: 'P1'
    });
  }
  if (metrics.ctr !== null && metrics.ctr < 0.01) {
    rules.push({
      id: 'low-ctr',
      title: 'CTR 偏低 / Low CTR',
      reason: '广告素材与关键词相关性不足。',
      evidence: `CTR=${fmtPct(metrics.ctr)}, impressions=${fmtNum(metrics.impressions)}`,
      suggestion: '优化创意与关键词匹配，提升首图吸引力。',
      priority: 'P1'
    });
  }
  if (metrics.cpc !== null && metrics.cpc > 2) {
    rules.push({
      id: 'high-cpc',
      title: 'CPC 过高 / High CPC',
      reason: '竞价成本较高，可能存在低质词竞争。',
      evidence: `CPC=${fmtNum(metrics.cpc)}`,
      suggestion: '设置否定词并调整竞价策略，分时段控价。',
      priority: 'P1'
    });
  }
  if (metrics.aov !== null && metrics.aov < 20) {
    rules.push({
      id: 'low-aov',
      title: '客单价较低 / Low AOV',
      reason: '客单价低导致利润空间受限。',
      evidence: `AOV=${fmtNum(metrics.aov)}`,
      suggestion: '尝试捆绑销售、加价购、满减策略。',
      priority: 'P2'
    });
  }
  if (metrics.returnRate !== null && metrics.returnRate > 0.1) {
    rules.push({
      id: 'high-return-rate',
      title: '退货率偏高 / High Return Rate',
      reason: '产品质量或描述不符风险较高。',
      evidence: `returnRate=${fmtPct(metrics.returnRate)}`,
      suggestion: '排查差评原因，修正详情页与质检流程。',
      priority: 'P1'
    });
  }
  if (metrics.impressions < 1000 && metrics.sessions < 200) {
    rules.push({
      id: 'low-traffic',
      title: '流量不足 / Low Traffic',
      reason: '曝光与访问体量偏小，限制了订单增长。',
      evidence: `impressions=${fmtNum(metrics.impressions)}, sessions=${fmtNum(metrics.sessions)}`,
      suggestion: '扩充关键词覆盖并增加自然流量入口。',
      priority: 'P1'
    });
  }
  if (warnings.length > 0) {
    rules.push({
      id: 'missing-data',
      title: '关键数据缺失 / Missing Key Fields',
      reason: '部分核心字段未匹配，可能导致指标不完整。',
      evidence: warnings.join('; '),
      suggestion: '导出含 orders/gmv/ad spend/sessions 的报表后重试。',
      priority: 'P0'
    });
  }

  return rules.sort((a, b) => a.priority.localeCompare(b.priority));
}
