const fs = require("fs");
const path = require("path");
const database = require('../models');

async function runReset() {
    const clearPath = path.join(__dirname, 'resets', '001_clear_database.sql');
    const sqlScript = fs.readFileSync(clearPath, 'utf8');

    // Split script into batches on lines with just "GO"
    const statements = sqlScript
        .split(/^\s*GO\s*$/gim) // match lines containing only "GO", case-insensitive
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);

    try { 
        const pool = await database.poolPromise;

        for (const stmt of statements) {
            await pool.request().batch(stmt); // Use .batch to support multi-line SQL
        }

        console.log('[+] Reset completed');
        await database.sql.close(); // Clean disconnect
        console.log('[-] Disconnected from MSSQL');
        process.exit(0);
    } catch (err) {
        console.error('[!] Reset error:', err);
        await database.sql.close(); // Clean disconnect
        process.exit(1);
    }
}

runReset();
