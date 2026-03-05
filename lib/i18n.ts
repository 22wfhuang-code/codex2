import { Lang } from './types';

export const dict = {
  zh: {
    appName: 'Amazon / 电商店铺数据诊断器',
    homeDesc: '上传报表后自动清洗字段、计算指标、输出亏损原因与7天优化计划。',
    start: '开始诊断',
    uploadTitle: '上传店铺报表',
    uploadDesc: '支持 CSV / XLSX，自动识别字段并分析。',
    useSample: '使用示例数据',
    analyzing: '正在分析数据...',
    gotoReport: '查看报告',
    metrics: '核心指标',
    diagnoses: '诊断结论',
    plan: '7天优化计划',
    export: '导出 Markdown 报告',
    backUpload: '返回上传页',
    noData: '暂无报告数据，请先上传分析。',
    aiDisabled: '未配置 OPENAI_API_KEY，将使用模板报告。',
    language: '语言'
  },
  en: {
    appName: 'Amazon / Ecommerce Store Diagnoser',
    homeDesc: 'Upload reports to auto-clean fields, compute KPIs, and get 7-day actions.',
    start: 'Start Diagnosis',
    uploadTitle: 'Upload Store Report',
    uploadDesc: 'Supports CSV / XLSX with automatic field mapping.',
    useSample: 'Use Sample Data',
    analyzing: 'Analyzing data...',
    gotoReport: 'View Report',
    metrics: 'Core Metrics',
    diagnoses: 'Diagnosis',
    plan: '7-Day Plan',
    export: 'Export Markdown Report',
    backUpload: 'Back to Upload',
    noData: 'No report yet. Please upload and analyze first.',
    aiDisabled: 'OPENAI_API_KEY missing. Template report will be used.',
    language: 'Language'
  }
} as const;

export function t(lang: Lang, key: keyof (typeof dict)['zh']): string {
  return dict[lang][key] ?? dict.zh[key];
}
