import { NextResponse } from 'next/server';
import { findRows, insertRow } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { Insight } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeUnpublished = searchParams.get('all') === 'true';

  const filter = includeUnpublished ? {} : { published: true };

  try {
    const data = await findRows<Insight>('insights', filter, { created_at: -1 });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = await insertRow<Insight>('insights', body);

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
