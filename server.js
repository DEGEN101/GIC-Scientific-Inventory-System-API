const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const chalk = require("chalk");
const boxen = require("boxen");
const setupSwaggerDocs = require("./config/swagger.config");

const app = express();

// Load config from .env or fallback
const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "https://localhost:3000";

// Load SSL certificate and key
const certDir = path.join(__dirname, "cert");
let credentials;
try {
    credentials = {
        key: fs.readFileSync(path.join(certDir, "key.pem")),
        cert: fs.readFileSync(path.join(certDir, "cert.pem")),
    };
} catch (err) {
    console.error("[!] Failed to load SSL certificates:", err.message);
    process.exit(1);
}

// CORS setup
app.use(cors({ origin: CORS_ORIGIN }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the GIC Scientific Stock System Server." });
});

// === ROUTE REGISTRATION ===
const routes = [
    "./routes/employee.routes",
    "./routes/inventory.routes",
    "./routes/location.routes",
    "./routes/supplier.routes",
    "./routes/purchaseOrder.routes",
    "./routes/purchaseOrderDetails.routes",
    "./routes/stockItem.routes",
    "./routes/stockItemAttribute.routes",
    "./routes/stockItemAttributeValue.routes",
    "./routes/stockItemCategory.routes",
    "./routes/stockItemGroup.routes",
    "./routes/uom.routes",
    "./routes/uomConversion.routes",
    "./routes/product.routes",
    "./routes/auditLog.routes"
];

routes.forEach(routePath => {
    require(routePath)(app);
});

// Swagger documentation
setupSwaggerDocs(app);

// === FORMATTED SERVER STARTUP LOG ===

const check = chalk.green("✔");
const label = (text) => chalk.bold.white(text.padEnd(6));
const value = (text) => chalk.cyan(text);

function showStartupMessage() {
    const httpBox = boxen(
        [
        `${check} ${label('URL')}: ${value(`http://localhost:${HTTP_PORT}`)}`,
        `${check} ${label('Docs')}: ${value(`http://localhost:${HTTP_PORT}/docs`)}`
        ].join('\n'),
        {
        padding: 1,
        borderStyle: 'round',
        borderColor: 'blue',
        title: 'HTTP Server',
        titleAlignment: 'center'
        }
    );

    const httpsBox = boxen(
        [
        `${check} ${label('URL')}: ${value(`https://localhost:${HTTPS_PORT}`)}`,
        `${check} ${label('Docs')}: ${value(`https://localhost:${HTTPS_PORT}/docs`)}`
        ].join('\n'),
        {
        padding: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
        title: 'HTTPS Server',
        titleAlignment: 'center'
        }
    );

    console.log('\n' + httpBox + '\n');
    console.log(httpsBox + '\n');
}

// === SERVER SETUP ===
let serversStarted = 0;
function checkAllStarted() {
    serversStarted++;
    if (serversStarted === 2) {
        showStartupMessage();
    }
}

http.createServer(app).listen(HTTP_PORT, checkAllStarted);
https.createServer(credentials, app).listen(HTTPS_PORT, checkAllStarted);
