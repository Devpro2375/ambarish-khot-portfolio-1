import { NextResponse } from 'next/server';
import { findRows, insertRow } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { ContactSubmission } from '@/lib/types';

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  const filter = status && status !== 'all' ? { status } : {};

  try {
    const data = await findRows<ContactSubmission>(
      'contact_submissions',
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
