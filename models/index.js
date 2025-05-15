const dbConfig = require("../config/db.config.js");

const sql = require('mssql');


const config = {
  user: dbConfig.user,
  password: dbConfig.password,
  server: dbConfig.server,
  database: dbConfig.database,
  options: dbConfig.options
};


const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
console.log('[+] Connected to MSSQL')
return pool
})
.catch(err => console.log('[!] Database Connection Failed! Bad Config: ', err))


const database = {};
database.sql = sql;
database.poolPromise = poolPromise;

database.employees = require("./employees.model.js")(sql, poolPromise);
database.stockItem = require("./stockItem.model.js")(sql, poolPromise);
database.inventory = require("./inventory.model.js")(sql, poolPromise);

module.exports = database;
