import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});

pool.on('error', (err) => {
  console.error('Unexpected DB pool error', err);
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development') {
    console.log('Query executed', { text: text.slice(0, 80), duration, rows: res.rowCount });
  }
  return res;
}

export async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connected');
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    return false;
  }
}

export default pool;
