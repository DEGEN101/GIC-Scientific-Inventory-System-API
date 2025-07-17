const fs = require("fs");
const path = require("path");
const database = require('../models');

async function runMigrations() {
  const migrationPath = path.join(__dirname, 'migrations', '001_create_tables.sql');
  const sqlScript = fs.readFileSync(migrationPath, 'utf8');

  try { 
    const pool = await database.poolPromise;
    await pool.request().query(sqlScript);
    console.log('[+] Migrations completed');

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