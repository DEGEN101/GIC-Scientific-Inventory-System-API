const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
    origin: "https://localhost:3000"
};
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the GIC Scientific Stock System Server." });
});

// api routes
require("./routes/employee.routes")(app);

require("./routes/inventory.routes")(app);
require("./routes/location.routes")(app);

require("./routes/supplier.routes")(app);
require("./routes/purchaseOrder.routes")(app);
require("./routes/purchaseOrderDetails.routes")(app);

require("./routes/stockItem.routes")(app);
require("./routes/stockItemAttribute.routes")(app);
require("./routes/stockItemAttributeValue.routes")(app);
require("./routes/stockItemCategory.routes")(app);
require("./routes/stockItemGroup.routes")(app);

require("./routes/uom.routes")(app);
require("./routes/uomConversion.routes")(app);

require("./routes/product.routes")(app);

require("./routes/auditLog.routes")(app);

app.listen(PORT, () => {
  console.log(`[+] Server running at http://localhost:${PORT}`);
});
