import { NextResponse } from 'next/server';
import { insertRow, query } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { FeedbackSubmission } from '@/lib/types';

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    const result =
      status && status !== 'all'
        ? await query<FeedbackSubmission>(
            'select * from feedback_submissions where status = $1 order by created_at desc',
            [status]
          )
        : await query<FeedbackSubmission>(
            'select * from feedback_submissions order by created_at desc'
          );

    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to load feedback submissions',
      },
      { status: 500 }
    );
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
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to submit feedback',
      },
      { status: 500 }
    );
  }
}
