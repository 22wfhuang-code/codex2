import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ParsedRow } from './types';

function decodeBuffer(buffer: Buffer): string {
  return new TextDecoder('utf-8', { fatal: false }).decode(buffer);
}

function normalizeHeader(value: unknown): string {
  return String(value ?? '')
    .trim()
    .replace(/[\u3000\s]+/g, ' ');
}

export function parseCsvBuffer(buffer: Buffer): ParsedRow[] {
  const content = decodeBuffer(buffer);
  const guessedDelimiter = content.includes('\t') ? '\t' : undefined;
  const parsed = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: 'greedy',
    delimiter: guessedDelimiter,
    transformHeader: normalizeHeader,
    dynamicTyping: false
  });

  if (parsed.errors.length > 0 && parsed.data.length === 0) {
    throw new Error(`CSV parse error: ${parsed.errors[0]?.message ?? 'unknown error'}`);
  }

  return parsed.data.filter((row) =>
    Object.values(row).some((value) => String(value ?? '').trim().length > 0)
  );
}

export function parseXlsxBuffer(buffer: Buffer): ParsedRow[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, string | number>>(firstSheet, {
    raw: false,
    defval: ''
  });

  return rows
    .map((row) => {
      const output: ParsedRow = {};
      for (const [key, value] of Object.entries(row)) {
        output[normalizeHeader(key)] = value;
      }
      return output;
    })
    .filter((row) => Object.values(row).some((value) => String(value ?? '').trim().length > 0));
}

export function parseFileToRows(buffer: Buffer, fileName: string): ParsedRow[] {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.csv') || lower.endsWith('.txt')) {
    return parseCsvBuffer(buffer);
  }
  if (lower.endsWith('.xlsx') || lower.endsWith('.xls')) {
    return parseXlsxBuffer(buffer);
  }
  throw new Error('Unsupported file type. Please upload CSV/XLSX.');
}
