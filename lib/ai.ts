import { AnalysisResult } from './types';
import { buildMarkdownReport } from './reportTemplate';

export async function generateOptionalAiSummary(result: AnalysisResult): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return buildMarkdownReport(result);
  }

  return `${buildMarkdownReport(result)}\n\n> AI key detected. You can integrate a richer AI summary here.`;
}
