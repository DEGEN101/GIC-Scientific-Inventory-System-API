const fs = require("fs");
const path = require("path");
const database = require('../models');

async function runSeed() {
    const seedPath = path.join(__dirname, 'seeds', '001_seed_initial_data.sql');
    const sqlScript = fs.readFileSync(seedPath, 'utf8');

    try { 
        const pool = await database.poolPromise;
        await pool.request().query(sqlScript);
        console.log('[+] Seed data inserted');

        await database.sql.close(); // Clean disconnect
        console.log('[-] Disconnected from MSSQL');
        process.exit(0);
    } catch (err) {
        console.error('[!] Seed error:', err);
        await database.sql.close(); // Clean disconnect
        process.exit(1);
    }
}

runSeed();
