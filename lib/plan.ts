import { Diagnosis, PlanDay } from './types';

export function generate7DayPlan(diagnoses: Diagnosis[]): PlanDay[] {
  const topIds = diagnoses.slice(0, 3).map((d) => d.id);

  return [
    {
      day: 1,
      focus: '止损与预算紧急处理',
      actions: ['暂停高花费低转化广告组', '设置广告日预算上限', '导出近7天搜索词并标记浪费词'],
      relatedDiagnosisIds: topIds
    },
    {
      day: 2,
      focus: '盈利底线修复',
      actions: ['按毛利率重算可承受出价', '下调亏损关键词竞价 15-30%', '建立否定关键词清单'],
      relatedDiagnosisIds: topIds
    },
    {
      day: 3,
      focus: 'Listing 转化优化',
      actions: ['优化主图和标题前80字符', '补充对比图与场景图', '检查价格与竞品差距并调整'],
      relatedDiagnosisIds: diagnoses.filter((d) => d.id.includes('conversion')).map((d) => d.id)
    },
    {
      day: 4,
      focus: '广告结构优化',
      actions: ['拆分品牌词/品类词/竞品词活动', '高意图词单独活动提高预算', '低效词降价或暂停'],
      relatedDiagnosisIds: diagnoses.filter((d) => ['high-acos', 'low-roas', 'high-cpc'].includes(d.id)).map((d) => d.id)
    },
    {
      day: 5,
      focus: '客单与复购提升',
      actions: ['创建捆绑包与加购优惠', '设置满减门槛拉升 AOV', '梳理售后触达降低退货'],
      relatedDiagnosisIds: diagnoses.filter((d) => ['low-aov', 'high-return-rate'].includes(d.id)).map((d) => d.id)
    },
    {
      day: 6,
      focus: '复盘与监控',
      actions: ['建立指标看板追踪 ACOS/CVR/CTR', '对比优化前后成本与利润', '输出本周可复制动作'],
      relatedDiagnosisIds: diagnoses.map((d) => d.id)
    },
    {
      day: 7,
      focus: '迭代实验',
      actions: ['制定下周 A/B 测试计划', '锁定3个核心增长假设', '保留有效策略并继续迭代'],
      relatedDiagnosisIds: diagnoses.map((d) => d.id)
    }
  ];
}
