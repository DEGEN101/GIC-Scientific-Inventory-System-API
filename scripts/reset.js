const fs = require("fs");
const path = require("path");
const database = require('../models');

async function runReset() {
    const clearPath = path.join(__dirname, 'resets', '001_clear_database.sql');
    const sqlScript = fs.readFileSync(clearPath, 'utf8');

    try { 
        const pool = await database.poolPromise;
        await pool.request().query(sqlScript);
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
