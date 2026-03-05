import { NextResponse } from 'next/server';
import { diagnose } from '@/lib/diagnose';
import { mapFields } from '@/lib/fieldMapper';
import { computeMetrics } from '@/lib/metrics';
import { generate7DayPlan } from '@/lib/plan';
import { parseFileToRows } from '@/lib/parse';
import { AnalysisResult } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rows = parseFileToRows(buffer, file.name);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Uploaded file has no data rows.' }, { status: 400 });
    }

    const { mappedRows, mapping, warnings } = mapFields(rows);
    const metrics = computeMetrics(mappedRows);
    const diagnoses = diagnose(metrics, warnings);
    const plan = generate7DayPlan(diagnoses);

    const result: AnalysisResult = { metrics, diagnoses, plan, mapping, warnings };

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Analyze failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
