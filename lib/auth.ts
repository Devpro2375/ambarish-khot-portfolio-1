import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { query } from './db';

const ADMIN_SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000;

type AdminUser = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  last_login: string | null;
  created_at: string;
  updated_at: string;
};

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
  const result = await query<AdminUser>(
    'select * from admin_users where email = $1 limit 1',
    [email]
  );
  const user = result.rows[0] ?? null;

  console.log('[AUTH] User lookup:', { email, found: !!user });

  if (!user) {
    console.log('[AUTH] User not found');
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password_hash);

  console.log('[AUTH] Password validation:', { isValid });

  if (!isValid) {
    console.log('[AUTH] Invalid password');
    return null;
  }

  await query(
    'update admin_users set last_login = now(), updated_at = now() where id = $1',
    [user.id]
  );

  console.log('[AUTH] Login successful');
  return user;
}
