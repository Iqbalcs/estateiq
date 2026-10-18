import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { env } from '../config/env.js';
import { pool } from './pool.js';

const seedFile = fileURLToPath(
  new URL('../../../database/seeds/001_development_seed.sql', import.meta.url),
);

async function seed() {
  if (env.nodeEnv === 'production') {
    throw new Error('The development seed cannot run in production');
  }

  const sql = await readFile(seedFile, 'utf8');
  await pool.query(sql);
  console.info('Development seed applied successfully');
  await pool.end();
}

seed().catch(async (error) => {
  console.error('Seed failed:', error.message);
  await pool.end();
  process.exitCode = 1;
});
