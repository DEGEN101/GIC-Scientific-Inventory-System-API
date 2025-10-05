const sql = require('mssql');
const chalk = require("chalk");
const boxen = require("boxen");

const dbConfig = require("../config/db.config.js");

const config = {
  user: dbConfig.user,
  password: dbConfig.password,
  server: dbConfig.server,
  database: dbConfig.database,
  options: dbConfig.options
};

const check = chalk.green("✔");
const dbBox = boxen(
    `${check} ${chalk.yellow('Connected to MSSQL')}`,
    {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'green',
    title: 'Database',
    titleAlignment: 'center'
    }
);

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log(dbBox);
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
database.stockCheck = require("./stockCheck.model.js")(sql, poolPromise);
database.stockCheckLine = require("./stockCheckLine.model.js")(sql, poolPromise);
database.stockCheckAdjustment = require("./stockCheckAdjustment.model.js")(sql, poolPromise);
database.stockMovement = require("./stockMovement.model.js")(sql, poolPromise);
// --------------------------------

// --- Purchases Related Models ---
database.supplier = require("./supplier.model.js")(sql, poolPromise);
database.purchaseOrder = require("./purchaseOrder.model.js")(sql, poolPromise);
database.purchaseOrderDetails = require("./purchaseOrderDetails.model.js")(sql, poolPromise);
database.stockItemSupplier = require("./stockItemSupplier.model.js")(sql, poolPromise);
// -------------------------------------------

// --- Stock Item Related Models ---
database.stockItem = require("./stockItem.model.js")(sql, poolPromise);
database.stockItemAttribute = require("./stockItemAttribute.model.js")(sql, poolPromise);
database.stockItemAttributeValue = require("./stockItemAttributeValue.model.js")(sql, poolPromise);
database.stockItemCategory = require("./stockItemCategory.model.js")(sql, poolPromise);
database.stockItemGroup = require("./stockItemGroup.model.js")(sql, poolPromise);
// --------------------------------

// --- Unit of Measurement Related Models ---
database.uom = require("./uom.model.js")(sql, poolPromise);
database.uomConversion = require("./uomConversion.model.js")(sql, poolPromise);
// ------------------------------------------

// --- Production Related Models ---
database.productionOrder = require("./productionOrder.model.js")(sql, poolPromise)
database.product = require("./product.model.js")(sql, poolPromise);
database.billOfMaterials = require("./billOfMaterials.model.js")(sql, poolPromise);
database.productionConsumption = require("./productionConsumption.model.js")(sql, poolPromise);
database.productionWaste = require("./productionWaste.model.js")(sql, poolPromise);
// ---------------------------------


// --- Logging Related Models ---
database.auditLog = require("./auditLog.model.js")(sql, poolPromise);
// -----------------------------

module.exports = database;
