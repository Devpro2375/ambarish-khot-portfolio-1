import { NextResponse } from 'next/server';
import { deleteById, updateRow } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { FeedbackSubmission } from '@/lib/types';

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
    const data = await updateRow<FeedbackSubmission>(
      'feedback_submissions',
      id,
      body
    );

    if (!data) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteById('feedback_submissions', id);

  if (!deleted) {
    return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Feedback deleted successfully' });
}
