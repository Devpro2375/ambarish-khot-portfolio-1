import { NextResponse } from 'next/server';
import { deleteById, updateRow } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { ContactSubmission } from '@/lib/types';

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
    const data = await updateRow<ContactSubmission>('contact_submissions', id, {
      ...body,
      updated_at: new Date().toISOString(),
    });

    if (!data) {
      return NextResponse.json(
        { error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update contact submission',
      },
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
  const deleted = await deleteById('contact_submissions', id);

  if (!deleted) {
    return NextResponse.json(
      { error: 'Contact submission not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: 'Contact submission deleted successfully' });
}
