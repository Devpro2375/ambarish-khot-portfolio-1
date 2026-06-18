import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { Insight } from '@/lib/types';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const result = await query<Insight>(
    'select * from insights where slug = $1 and published = true limit 1',
    [slug]
  );
  const data = result.rows[0];

  if (!data) {
    return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}
