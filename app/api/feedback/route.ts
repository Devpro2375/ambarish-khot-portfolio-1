import { NextResponse } from 'next/server';
import { z } from 'zod';
import { findRows, insertRow } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import type { FeedbackSubmission } from '@/lib/types';

const feedbackTypes = [
  'general',
  'testimonial',
  'technical',
  'collaboration',
] as const;

const feedbackSchema = z
  .object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(254),
    feedback_type: z.enum(feedbackTypes),
    message: z.string().min(10).max(4000),
    rating: z.number().int().min(1).max(5).optional(),
  })
  .strict();

function sanitizeMultiline(value: unknown) {
  return String(value ?? '')
    .normalize('NFKC')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/[<>]/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

function sanitizeSingleLine(value: unknown) {
  return sanitizeMultiline(value).replace(/\s+/g, ' ').trim();
}

function parseRating(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  return Number(value);
}

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

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Invalid feedback data' },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;

    const parsed = feedbackSchema.safeParse({
      name: sanitizeSingleLine(input.name),
      email: sanitizeSingleLine(input.email).toLowerCase(),
      feedback_type: sanitizeSingleLine(input.feedback_type),
      message: sanitizeMultiline(input.message),
      rating: parseRating(input.rating),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid feedback data' },
        { status: 400 }
      );
    }

    const { name, email, feedback_type, message, rating } = parsed.data;

    const data = await insertRow<FeedbackSubmission>('feedback_submissions', {
      name,
      email,
      feedback_type,
      message,
      rating: rating ?? null,
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
