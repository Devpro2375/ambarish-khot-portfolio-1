import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');

  if (!existsSync(envPath)) {
    return;
  }

  const content = readFileSync(envPath, 'utf8');

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    const value = rawValue.trim().replace(/^['"]|['"]$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
const dbName =
  process.env.MONGODB_DB_NAME ||
  process.env.MONGODB_DATABASE ||
  process.env.DATABASE_NAME ||
  'ambrish_khot';
const email = process.env.ADMIN_EMAIL || 'admin@ambarishkhot.com';
const password = process.env.ADMIN_PASSWORD || 'admin123';
const name = process.env.ADMIN_NAME || 'Admin';

if (!uri) {
  console.error('Missing MONGODB_URI. Add it to .env before running this script.');
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date().toISOString();

  await db.collection('admin_users').updateOne(
    { email },
    {
      $set: {
        email,
        name,
        password_hash: passwordHash,
        updated_at: now,
      },
      $setOnInsert: {
        created_at: now,
        last_login: null,
      },
    },
    { upsert: true }
  );

  console.log(`Admin user ready: ${email}`);
  console.log('Password was stored as a bcrypt hash.');
} finally {
  await client.close();
}
