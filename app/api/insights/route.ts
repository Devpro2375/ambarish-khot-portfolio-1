import { NextResponse } from 'next/server';
import { insertRow, query } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { Insight } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeUnpublished = searchParams.get('all') === 'true';

  try {
    const result = await query<Insight>(
      `select * from insights ${
        includeUnpublished ? '' : 'where published = true'
      } order by created_at desc`
    );

    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load insights' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = await insertRow<Insight>('insights', {
      ...body,
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create insight' },
      { status: 500 }
    );
  }
}
