import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  tags: string[];
  published: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  read_time: string;
  author: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string[];
    }[];
    conclusion: string;
    keyFindings: string[];
  };
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  organization?: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  created_at: string;
  updated_at: string;
};

export type FeedbackSubmission = {
  id: string;
  name: string;
  email: string;
  feedback_type: 'general' | 'technical' | 'collaboration';
  message: string;
  rating?: number;
  status: 'new' | 'read' | 'responded' | 'archived';
  created_at: string;
  updated_at: string;
};
