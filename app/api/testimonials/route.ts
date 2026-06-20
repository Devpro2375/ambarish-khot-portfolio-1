import { NextResponse } from 'next/server';
import { findRows } from '@/lib/db';
import type { FeedbackSubmission } from '@/lib/types';

type PublicTestimonial = {
  id: string;
  name: string;
  relationship?: string;
  organization?: string;
  message: string;
  rating?: number | null;
  created_at: string;
};

function parseTestimonial(submission: FeedbackSubmission): PublicTestimonial {
  const lines = submission.message.split('\n');
  const relationshipLine = lines.find((line) =>
    line.startsWith('Relationship:')
  );
  const organizationLine = lines.find((line) =>
    line.startsWith('Organization:')
  );
  const messageStartIndex = lines.findIndex((line) => line.trim() === '');
  const message =
    messageStartIndex >= 0
      ? lines.slice(messageStartIndex + 1).join('\n').trim()
      : submission.message.trim();

  return {
    id: submission.id,
    name: submission.name,
    relationship: relationshipLine?.replace('Relationship:', '').trim(),
    organization: organizationLine?.replace('Organization:', '').trim(),
    message,
    rating: submission.rating,
    created_at: submission.created_at,
  };
}

export async function GET() {
  try {
    const testimonials = await findRows<FeedbackSubmission>(
      'feedback_submissions',
      {
        feedback_type: 'testimonial',
        status: 'responded',
      },
      { created_at: -1 }
    );

    return NextResponse.json(testimonials.map(parseTestimonial));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
