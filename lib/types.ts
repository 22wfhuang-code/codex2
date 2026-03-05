export type Lang = 'zh' | 'en';

export type StandardField =
  | 'orders'
  | 'gmv'
  | 'ad_spend'
  | 'sessions'
  | 'profit'
  | 'cogs'
  | 'returns'
  | 'clicks'
  | 'impressions'
  | 'units';

export type ParsedRow = Record<string, string | number | null | undefined>;

export type MappedRow = Record<StandardField, number>;

export type Metrics = {
  gmv: number;
  orders: number;
  adSpend: number;
  profit: number;
  cogs: number;
  returns: number;
  sessions: number;
  clicks: number;
  impressions: number;
  units: number;
  grossMargin: number | null;
  netMargin: number | null;
  acos: number | null;
  tacos: number | null;
  roas: number | null;
  roi: number | null;
  conversionRate: number | null;
  ctr: number | null;
  cpc: number | null;
  aov: number | null;
  returnRate: number | null;
};

export type DiagnosisPriority = 'P0' | 'P1' | 'P2';

export type Diagnosis = {
  id: string;
  title: string;
  reason: string;
  evidence: string;
  suggestion: string;
  priority: DiagnosisPriority;
};

export type PlanDay = {
  day: number;
  focus: string;
  actions: string[];
  relatedDiagnosisIds: string[];
};

export type AnalysisResult = {
  metrics: Metrics;
  diagnoses: Diagnosis[];
  plan: PlanDay[];
  mapping: Partial<Record<StandardField, string>>;
  warnings: string[];
};
