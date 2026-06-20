import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { findOne, updateRow } from '@/lib/db';
import type { AdminUser } from '@/lib/types';

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
  const user = await findOne<AdminUser>('admin_users', { email });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    return null;
  }

  await updateRow<AdminUser>('admin_users', user.id, {
    last_login: new Date().toISOString(),
  });

  return user;
}
