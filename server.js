const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

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
  "./routes/auditLog.routes",
];

routes.forEach(routePath => {
  require(routePath)(app);
});

// Swagger documentation
setupSwaggerDocs(app);

// === SERVER SETUP ===
http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`[+] HTTP server running at http://localhost:${HTTP_PORT}`);
  console.log(`[+] Swagger docs available at http://localhost:${HTTP_PORT}/docs`);
});

https.createServer(credentials, app).listen(HTTPS_PORT, () => {
  console.log(`[+] HTTPS server running at https://localhost:${HTTPS_PORT}`);
  console.log(`[+] Swagger docs available at https://localhost:${HTTPS_PORT}/docs`);
});
