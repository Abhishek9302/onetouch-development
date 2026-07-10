import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const DATABASE_URL = process.env.DATABASE_URL || '';

const isManaged =
  DATABASE_URL.includes('rds') ||
  DATABASE_URL.includes('amazonaws') ||
  DATABASE_URL.includes('railway') ||
  process.env.PGSSLMODE === 'require';

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: isManaged ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

/**
 * Locate database/schema.sql regardless of where the code is compiled/run from.
 * On Railway the backend builds to /app and runs from /app/dist, so the schema
 * (synced to <backend>/database/schema.sql) ends up at /app/database/schema.sql.
 * We search a broad set of candidate locations relative to __dirname and cwd.
 */
function findSchemaFile(): string | null {
  const names = ['schema.sql'];
  const roots = [
    __dirname,
    path.resolve(__dirname, '..'),
    path.resolve(__dirname, '../..'),
    path.resolve(__dirname, '../../..'),
    process.cwd(),
    path.resolve(process.cwd(), '..'),
    '/app',
  ];
  const subdirs = ['', 'database', 'db', 'sql', 'dist/database', 'src/database'];
  for (const root of roots) {
    for (const sub of subdirs) {
      for (const name of names) {
        const candidate = path.join(root, sub, name);
        try {
          if (fs.existsSync(candidate)) return candidate;
        } catch {
          /* ignore */
        }
      }
    }
  }
  return null;
}

export async function initSchema(): Promise<void> {
  const schemaPath = findSchemaFile();
  if (!schemaPath) {
    console.warn('[DB] schema.sql not found in any known location — skipping schema init');
    return;
  }
  const sql = fs.readFileSync(schemaPath, 'utf8');
  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log(`[DB] Schema initialized successfully from ${schemaPath}`);
  } finally {
    client.release();
  }
}

export async function checkDbHealth(): Promise<boolean> {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
