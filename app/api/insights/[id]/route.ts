import { NextResponse } from 'next/server';
import { deleteById, query, updateRow } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { Insight } from '@/lib/types';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await query<Insight>(
    'select * from insights where id = $1 limit 1',
    [id]
  );
  const data = result.rows[0];

  if (!data) {
    return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = await updateRow<Insight>('insights', id, {
      ...body,
      updated_at: new Date().toISOString(),
    });

    if (!data) {
      return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update insight' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteById('insights', id);

  if (!deleted) {
    return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Insight deleted successfully' });
}
