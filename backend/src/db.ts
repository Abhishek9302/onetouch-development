import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const DATABASE_URL = process.env.DATABASE_URL || '';

const isAWS = DATABASE_URL.includes('rds') || DATABASE_URL.includes('amazonaws');

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: isAWS ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export async function initSchema(): Promise<void> {
  const schemaPath = path.resolve(__dirname, '../../../database/schema.sql');
  let sql: string;
  try {
    sql = fs.readFileSync(schemaPath, 'utf8');
  } catch {
    // Try alternate path for compiled output
    const altPath = path.resolve(__dirname, '../../database/schema.sql');
    sql = fs.readFileSync(altPath, 'utf8');
  }
  const client = await pool.connect();
  try {
    await client.query(sql);
    console.log('[DB] Schema initialized successfully');
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
