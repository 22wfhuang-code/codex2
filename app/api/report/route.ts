import { NextResponse } from 'next/server';
import { generateOptionalAiSummary } from '@/lib/ai';
import { AnalysisResult } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalysisResult;
    const markdown = await generateOptionalAiSummary(body);
    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename="diagnosis-report.md"'
      }
    });
  } catch {
    return NextResponse.json({ error: 'Failed to generate report markdown.' }, { status: 400 });
  }
}
