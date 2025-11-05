import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { data, error } = await supabase
    .from('insights')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}
