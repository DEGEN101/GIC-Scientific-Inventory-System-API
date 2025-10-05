const fs = require("fs");
const path = require("path");
const database = require('../models');

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'migrations');

  try { 
    const files = fs.readdirSync(migrationsDir).filter(file => file.endsWith('.sql')).sort();
    const pool = await database.poolPromise;

    for (const file of files) {
        const filePath = path.join(migrationsDir, file);
        const sqlScript = fs.readFileSync(filePath, 'utf8');
        const batches = sqlScript.split(/\r?\n\s*GO\s*\r?\n/i).filter(b => b.trim() !== '');

        console.log(`[+] Running seed: ${file}`);
        for (const batch of batches) {
            const trimmedBatch = batch.trim();
            if (trimmedBatch.length > 0) {
                await pool.request().batch(trimmedBatch); 
            }
        }
    }

    console.log('[+] All migrations completed');
    await database.sql.close(); // Clean disconnect
    console.log('[-] Disconnected from MSSQL');
    process.exit(0);
  } catch (err) {
    console.error('[!] Migration error:', err);
    await database.sql.close(); // Clean disconnect
    process.exit(1);
  }
}

runMigrations();