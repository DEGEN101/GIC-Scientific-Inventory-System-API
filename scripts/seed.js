const fs = require("fs");
const path = require("path");
const database = require('../models');

async function runSeed() {
    const seedsDir = path.join(__dirname, 'seeds');

    try {
        const files = fs.readdirSync(seedsDir).filter(file => file.endsWith('.sql')).sort();
        const pool = await database.poolPromise;

        for (const file of files) {
            const filePath = path.join(seedsDir, file);
            const sqlScript = fs.readFileSync(filePath, 'utf8');

            console.log(`[+] Running seed: ${file}`);
            await pool.request().batch(sqlScript); // use .batch() to support multi-statement scripts
        }

        console.log('[+] All seed data inserted');
        await database.sql.close();
        console.log('[-] Disconnected from MSSQL');
        process.exit(0);
    } catch (err) {
        console.error('[!] Seed error:', err);
        await database.sql.close();
        process.exit(1);
    }
}

runSeed();
