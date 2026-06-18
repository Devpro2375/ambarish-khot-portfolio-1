import { NextResponse } from 'next/server';
import { insertRow, query } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { ContactSubmission } from '@/lib/types';

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
        ? await query<ContactSubmission>(
            'select * from contact_submissions where status = $1 order by created_at desc',
            [status]
          )
        : await query<ContactSubmission>(
            'select * from contact_submissions order by created_at desc'
          );

    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to load contact submissions',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const data = await insertRow<ContactSubmission>('contact_submissions', {
      name,
      email,
      organization,
      message,
      status: 'new',
    });

    return NextResponse.json(
      { message: 'Contact form submitted successfully', data },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to submit contact form',
      },
      { status: 500 }
    );
  }
}
