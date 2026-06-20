import { NextResponse } from 'next/server';
import { findOne } from '@/lib/db';
import type { Insight } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = await findOne<Insight>('insights', { slug, published: true });

  if (!data) {
    return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}
