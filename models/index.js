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

// --- Employee Model ---
database.employees = require("./employees.model.js")(sql, poolPromise);
// ----------------------

// --- Inventory Related Models ---
database.inventory = require("./inventory.model.js")(sql, poolPromise);
database.location = require("./location.model.js")(sql, poolPromise);
// --------------------------------

// --- Purchases Related Models ---
database.supplier = require("./supplier.model.js")(sql, poolPromise);
database.purchaseOrder = require("./purchaseOrder.model.js")(sql, poolPromise);
database.purchaseOrderDetails = require("./purchaseOrderDetails.model.js")(sql, poolPromise);
// -------------------------------------------

// --- Stock Item Related Models ---
database.stockItem = require("./stockItem.model.js")(sql, poolPromise);
database.stockItemAttribute = require("./stockItemAttribute.model.js")(sql, poolPromise);
database.stockItemAttributeValue = require("./stockItemAttributeValue.model.js")(sql, poolPromise);
database.stockItemCategory = require("./stockItemCategory.model.js")(sql, poolPromise);
database.stockItemGroup = require("./stockItemGroup.model.js")(sql, poolPromise);
// --------------------------------

// --- Unit of Measurement Related Models ---
database.uom = require("./uom.model.js")(sql ,poolPromise);
database.uomConversion = require("./uomConversion.model.js")(sql ,poolPromise);
// ------------------------------------------

// --- Production Related Models ---
database.product = require("./product.model.js")(sql ,poolPromise);
// ---------------------------------


// --- Logging Related Models ---
database.auditLog = require("./auditLog.model.js")(sql ,poolPromise);
// -----------------------------

module.exports = database;
