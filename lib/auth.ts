import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export async function createAdminSession(email: string) {
  const sessionToken = Buffer.from(
    JSON.stringify({
      email,
      createdAt: Date.now(),
    })
  ).toString('base64');

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });

  return sessionToken;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);

  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString()
    );

    if (Date.now() - session.createdAt > SESSION_DURATION) {
      await clearAdminSession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function verifyAdmin(email: string, password: string) {
  const { data: user, error } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  console.log('[AUTH] User lookup:', { email, found: !!user, error });

  if (!user) {
    console.log('[AUTH] User not found');
    return null;
  }

  const bcrypt = require('bcryptjs');
  const isValid = await bcrypt.compare(password, user.password_hash);

  console.log('[AUTH] Password validation:', { isValid });

  if (!isValid) {
    console.log('[AUTH] Invalid password');
    return null;
  }

  await supabaseAdmin
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id);

  console.log('[AUTH] Login successful');
  return user;
}
