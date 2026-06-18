import { Pool, type PoolConfig } from 'pg';

const globalForPostgres = globalThis as typeof globalThis & {
  postgresPool?: Pool;
};

let pool = globalForPostgres.postgresPool;

const tableColumns = {
  projects: [
    'title',
    'category',
    'description',
    'impact',
    'tags',
    'published',
    'order_index',
    'image_url',
    'created_at',
    'updated_at',
  ],
  insights: [
    'slug',
    'title',
    'excerpt',
    'date',
    'category',
    'read_time',
    'author',
    'content',
    'published',
    'image_url',
    'created_at',
    'updated_at',
  ],
  contact_submissions: [
    'name',
    'email',
    'organization',
    'message',
    'status',
    'created_at',
    'updated_at',
  ],
  feedback_submissions: [
    'name',
    'email',
    'feedback_type',
    'message',
    'rating',
    'status',
    'created_at',
    'updated_at',
  ],
} as const;

type TableName = keyof typeof tableColumns;

function getSslConfig(connectionString: string): PoolConfig['ssl'] {
  if (
    process.env.POSTGRES_SSL === 'false' ||
    connectionString.includes('sslmode=disable')
  ) {
    return undefined;
  }

  if (
    process.env.POSTGRES_SSL === 'true' ||
    process.env.NODE_ENV === 'production' ||
    connectionString.includes('sslmode=require')
  ) {
    return { rejectUnauthorized: false };
  }

  return undefined;
}

function getPool() {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. Add your PostgreSQL connection string in Vercel Environment Variables.'
    );
  }

  pool = new Pool({
    connectionString,
    ssl: getSslConfig(connectionString),
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPostgres.postgresPool = pool;
  }

  return pool;
}

function quoteIdentifier(identifier: string) {
  return `"${identifier}"`;
}

function getAllowedEntries(
  table: TableName,
  values: Record<string, unknown>
) {
  const allowedColumns = new Set<string>(tableColumns[table]);

  return Object.entries(values).filter(
    ([key, value]) => allowedColumns.has(key) && value !== undefined
  );
}

export async function query<T>(
  text: string,
  params: unknown[] = []
): Promise<{ rows: T[]; rowCount: number | null }> {
  const result = await getPool().query(text, params);
  return {
    rows: result.rows as T[],
    rowCount: result.rowCount,
  };
}

export async function insertRow<T>(
  table: TableName,
  values: Record<string, unknown>
) {
  const entries = getAllowedEntries(table, values);

  if (entries.length === 0) {
    throw new Error(`No valid fields supplied for ${table}.`);
  }

  const columns = entries.map(([column]) => quoteIdentifier(column)).join(', ');
  const placeholders = entries.map((_, index) => `$${index + 1}`).join(', ');
  const params = entries.map(([, value]) => value);

  const result = await query<T>(
    `insert into ${quoteIdentifier(table)} (${columns}) values (${placeholders}) returning *`,
    params
  );

  return result.rows[0];
}

export async function updateRow<T>(
  table: TableName,
  id: string,
  values: Record<string, unknown>
) {
  const entries = getAllowedEntries(table, values);

  if (entries.length === 0) {
    throw new Error(`No valid fields supplied for ${table}.`);
  }

  const assignments = entries
    .map(([column], index) => `${quoteIdentifier(column)} = $${index + 1}`)
    .join(', ');
  const params = [...entries.map(([, value]) => value), id];

  const result = await query<T>(
    `update ${quoteIdentifier(table)} set ${assignments} where id = $${entries.length + 1} returning *`,
    params
  );

  return result.rows[0] ?? null;
}

export async function deleteById(table: TableName, id: string) {
  const result = await query(
    `delete from ${quoteIdentifier(table)} where id = $1`,
    [id]
  );

  return (result.rowCount ?? 0) > 0;
}
