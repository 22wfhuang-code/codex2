import { AnalysisResult } from './types';

export function buildMarkdownReport(result: AnalysisResult): string {
  const lines: string[] = [];
  lines.push('# Amazon / 电商店铺数据诊断报告');
  lines.push('');
  lines.push('## 核心指标');
  Object.entries(result.metrics).forEach(([k, v]) => {
    lines.push(`- **${k}**: ${typeof v === 'number' ? v.toFixed(4) : v ?? 'N/A'}`);
  });
  lines.push('');
  lines.push('## 诊断结论');
  result.diagnoses.forEach((d) => {
    lines.push(`### [${d.priority}] ${d.title}`);
    lines.push(`- 原因: ${d.reason}`);
    lines.push(`- 证据: ${d.evidence}`);
    lines.push(`- 建议: ${d.suggestion}`);
  });
  lines.push('');
  lines.push('## 7天计划');
  result.plan.forEach((day) => {
    lines.push(`### Day ${day.day} - ${day.focus}`);
    day.actions.forEach((action) => lines.push(`- ${action}`));
  });

  if (result.warnings.length > 0) {
    lines.push('');
    lines.push('## 数据提醒');
    result.warnings.forEach((w) => lines.push(`- ${w}`));
  }

  return lines.join('\n');
}
