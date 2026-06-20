import { NextResponse } from 'next/server';
import { findRows, insertRow } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { FeedbackSubmission } from '@/lib/types';

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  const filter = status && status !== 'all' ? { status } : {};

  try {
    const data = await findRows<FeedbackSubmission>(
      'feedback_submissions',
      filter,
      { created_at: -1 }
    );
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, feedback_type, message, rating } = body;

    if (!name || !email || !feedback_type || !message) {
      return NextResponse.json(
        { error: 'Name, email, feedback type, and message are required' },
        { status: 400 }
      );
    }

    const data = await insertRow<FeedbackSubmission>('feedback_submissions', {
      name,
      email,
      feedback_type,
      message,
      rating,
      status: 'new',
    });

    return NextResponse.json(
      { message: 'Feedback submitted successfully', data },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
