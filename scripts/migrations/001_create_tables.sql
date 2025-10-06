use [GIC Inventory Database];

-- Location Table
CREATE TABLE Location (
    LocationID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
);

-- UnitOfMeasurement Table
CREATE TABLE UnitOfMeasurement (
    UoMID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    IsBaseUnit BIT DEFAULT 0
);

-- UoM_Conversion Table
CREATE TABLE UoM_Conversion (
    FromUoMID INT NOT NULL,
    ToUoMID INT NOT NULL,
    ConversionFactor DECIMAL(10, 4) NOT NULL,
    PRIMARY KEY (FromUoMID, ToUoMID),
    FOREIGN KEY (FromUoMID) REFERENCES UnitOfMeasurement(UoMID),
    FOREIGN KEY (ToUoMID) REFERENCES UnitOfMeasurement(UoMID)
);

-- StockItemCategory Table
CREATE TABLE StockItemCategory (
    StockItemCategoryID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
);

-- StockItemGroup Table
CREATE TABLE StockItemGroup (
    StockItemGroupID INT IDENTITY(1,1) PRIMARY KEY,
    StockItemCategoryID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255),
    FOREIGN KEY (StockItemCategoryID) REFERENCES StockItemCategory(StockItemCategoryID)
);

-- StockItem Table
CREATE TABLE StockItem (
    StockItemID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    SKU VARCHAR(50) NOT NULL UNIQUE,
    MinimumQuantity DECIMAL(10, 2) NOT NULL DEFAULT 0,
    Description TEXT,
    StockItemGroupID INT NOT NULL,
    BaseUoMID INT NOT NULL,
    FOREIGN KEY (StockItemGroupID) REFERENCES StockItemGroup(StockItemGroupID),
    FOREIGN KEY (BaseUoMID) REFERENCES UnitOfMeasurement(UoMID)
);

-- StockItemAttribute Table
CREATE TABLE StockItemAttribute (
    AttributeID INT IDENTITY(1,1) PRIMARY KEY,
    StockItemCategoryID INT NOT NULL,
    AttributeName VARCHAR(100) NOT NULL,
    FOREIGN KEY (StockItemCategoryID) REFERENCES StockItemCategory(StockItemCategoryID)
);

-- StockItemAttributeValue Table
CREATE TABLE StockItemAttributeValue (
    StockItemID INT NOT NULL,
    AttributeID INT NOT NULL,
    AttributeValue VARCHAR(255),
    PRIMARY KEY (StockItemID, AttributeID),
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID) ON DELETE CASCADE,
    FOREIGN KEY (AttributeID) REFERENCES StockItemAttribute(AttributeID) ON DELETE CASCADE
);

-- Inventory Table
CREATE TABLE Inventory (
    InventoryID INT IDENTITY(1,1) PRIMARY KEY,
    StockItemID INT NOT NULL,
    Quantity DECIMAL(10, 2) NOT NULL,
    BatchNumber VARCHAR(50),
    IsPartial BIT DEFAULT 0,
    LocationID INT NOT NULL,

    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID) ON DELETE CASCADE,
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID),
);

-- Supplier Table
CREATE TABLE Supplier (
    SupplierID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    ContactName NVARCHAR(100) NULL,             
    Email NVARCHAR(255) NULL,                   
    Phone NVARCHAR(50) NULL,                    
    
    BillingAddress NVARCHAR(255) NULL,       
    
    Status NVARCHAR(50) DEFAULT 'Active'
);

--StockItemSupplier Table
CREATE TABLE StockItemSupplier (
    StockItemID INT NOT NULL,
    SupplierID INT NOT NULL,
    IsPreferred BIT DEFAULT 0,
    PRIMARY KEY (StockItemID, SupplierID),
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID) ON DELETE CASCADE,
    FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID) ON DELETE CASCADE
);

-- PurchaseOrder Table
CREATE TABLE PurchaseOrder (
    POID INT IDENTITY(1,1) PRIMARY KEY,
    SupplierID INT NOT NULL,
    OrderDate DATE NOT NULL,
    Status VARCHAR(50) NOT NULL,
    FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID)
);

-- PurchaseOrderDetails Table
CREATE TABLE PurchaseOrderDetails (
    POID INT NOT NULL,
    StockItemID INT NOT NULL,
    Quantity DECIMAL(10, 2) NOT NULL,
    UoMID INT NOT NULL,
    PackagingTypeID INT,
    PRIMARY KEY (POID, StockItemID),
    FOREIGN KEY (POID) REFERENCES PurchaseOrder(POID) ON DELETE CASCADE,
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID) ON DELETE CASCADE,
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID)
);

-- Employees Table
CREATE TABLE Employees (
    EmployeeID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    PhoneNumber NCHAR(10) NOT NULL
);

-- StockCheck (header/session level)
CREATE TABLE StockCheck (
    StockCheckID INT IDENTITY(1,1) PRIMARY KEY,
    LocationID INT NOT NULL,             -- Which location is being checked
    EmployeeID INT NOT NULL,             -- Who initiated the stock check
    StartDate DATETIME NOT NULL DEFAULT GETDATE(),
    EndDate DATETIME NULL,
    Status VARCHAR(50) NOT NULL DEFAULT 'In Progress', -- In Progress, Completed, Cancelled

    FOREIGN KEY (LocationID) REFERENCES Location(LocationID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- StockCheckLine (per stock item in a check)
CREATE TABLE StockCheckLine (
    StockCheckLineID INT IDENTITY(1,1) PRIMARY KEY,
    StockCheckID INT NOT NULL,
    InventoryID INT NOT NULL,           -- Links to specific inventory record (batch/location)
    ExpectedQuantity DECIMAL(10, 2) NOT NULL, -- From system at start of check
    CountedQuantity DECIMAL(10, 2) NOT NULL,  -- What employee counted
    Difference AS (CountedQuantity - ExpectedQuantity) PERSISTED,
    IsAdjusted BIT DEFAULT 0,           -- Whether this line has been adjusted already

    FOREIGN KEY (StockCheckID) REFERENCES StockCheck(StockCheckID) ON DELETE CASCADE,
    FOREIGN KEY (InventoryID) REFERENCES Inventory(InventoryID) ON DELETE CASCADE
);

-- StockCheckAdjustment (optional, to track the exact adjustment before movement is logged)
CREATE TABLE StockCheckAdjustment (
    AdjustmentID INT IDENTITY(1,1) PRIMARY KEY,
    StockCheckLineID INT NOT NULL,
    AdjustmentQuantity DECIMAL(10,2) NOT NULL, -- The amount applied to fix discrepancy
    AdjustmentDate DATETIME NOT NULL DEFAULT GETDATE(),
    EmployeeID INT NOT NULL,                   -- Who performed adjustment
    Notes VARCHAR(255),

    FOREIGN KEY (StockCheckLineID) REFERENCES StockCheckLine(StockCheckLineID) ON DELETE CASCADE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- StockMovement Table
CREATE TABLE StockMovement (
    MovementID INT IDENTITY(1,1) PRIMARY KEY,
    FromInventoryID INT NULL,                -- Where it came from (null if new stock added)
    ToInventoryID INT NULL,                  -- Where it went (null if stock was removed)
    Quantity DECIMAL(10, 2) NOT NULL,        -- Always positive number
    MovementType VARCHAR(50) NOT NULL CHECK (
        MovementType IN ('Purchase', 'Sale', 'Consumption', 'Transfer', 'Adjustment')
    ),
    MovementDate DATETIME NOT NULL DEFAULT GETDATE(),
    EmployeeID INT NOT NULL,                 -- Who made the movement
    ReferenceID INT NULL,                    -- Links to POID, SOID, ProductionOrderID, StockCheckID, etc.
    Notes VARCHAR(255),

    FOREIGN KEY (FromInventoryID) REFERENCES Inventory(InventoryID),
    FOREIGN KEY (ToInventoryID) REFERENCES Inventory(InventoryID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- ProductionOrder Table
CREATE TABLE ProductionOrder (
    ProductionOrderID INT IDENTITY(1,1) PRIMARY KEY,
    QuantityToProduce DECIMAL(18,2) NOT NULL,
    ProductionDate DATETIME NOT NULL DEFAULT GETDATE(),
    Status VARCHAR(20) NOT NULL DEFAULT 'Planned',
    CreatedBy INT NULL,
    Notes TEXT NULL,
    InvoiceNumber VARCHAR(50) NULL,

    FOREIGN KEY (CreatedBy) REFERENCES Employees(EmployeeID)
);

-- Product Table
CREATE TABLE Product (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    ProductionOrderID INT NULL,
    Name VARCHAR(50) NOT NULL,
    BatchNumber VARCHAR(50) NOT NULL,
    Quantity DECIMAL(18,2) NOT NULL,
    Dimensions VARCHAR(50) NULL,

    FOREIGN KEY (ProductionOrderID) REFERENCES ProductionOrder(ProductionOrderID) ON UPDATE CASCADE ON DELETE SET NULL
);

-- BillOfMaterials Table
CREATE TABLE BillOfMaterials (
    BOMID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    RawMaterialID INT NOT NULL,
    QuantityRequired DECIMAL(10, 2) NOT NULL,
    UoMID INT NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    FOREIGN KEY (RawMaterialID) REFERENCES Inventory(InventoryID),
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID)
);

-- ProductionConsumption Table
CREATE TABLE ProductionConsumption (
    ProductionOrderID INT NOT NULL,
    InventoryID INT NOT NULL,
    QuantityUsed DECIMAL(18,2) NOT NULL,

    PRIMARY KEY (ProductionOrderID, InventoryID),

    FOREIGN KEY (ProductionOrderID) REFERENCES ProductionOrder(ProductionOrderID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (InventoryID) REFERENCES Inventory(InventoryID) ON UPDATE CASCADE ON DELETE NO ACTION,
);

-- ProductionWaste Table
CREATE TABLE ProductionWaste (
    WasteLogID INT IDENTITY(1,1) PRIMARY KEY,
    ProductionOrderID INT NOT NULL,
    InventoryID INT NOT NULL,
    QuantityWasted DECIMAL(18,2) NOT NULL,
    Reason TEXT NULL,
    UoMID INT NOT NULL,

    FOREIGN KEY (ProductionOrderID) REFERENCES ProductionOrder(ProductionOrderID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (InventoryID) REFERENCES Inventory(InventoryID) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- Customers Table
CREATE TABLE Customer (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    PhoneNumber NCHAR(10) NOT NULL
);

-- SalesOrder Table
CREATE TABLE SalesOrder (
    SOID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate DATE NOT NULL,
    Status VARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);

-- SalesOrderDetails Table
CREATE TABLE SalesOrderDetails (
    SOID INT NOT NULL,
    StockItemID INT NOT NULL,
    Quantity DECIMAL(10, 2) NOT NULL,
    UoMID INT NOT NULL,
    PRIMARY KEY (SOID, StockItemID),
    FOREIGN KEY (SOID) REFERENCES SalesOrder(SOID) ON DELETE CASCADE,
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID),
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID)
);

-- Invoices Table
CREATE TABLE Invoices (
    InvoiceID INT IDENTITY(1,1) PRIMARY KEY,
    SOID INT NOT NULL,
    InvoiceDate DATE NOT NULL,
    TotalAmount DECIMAL(12, 2) NOT NULL,
    PaidStatus VARCHAR(50),
    FOREIGN KEY (SOID) REFERENCES SalesOrder(SOID) ON DELETE CASCADE
);

-- AuditLog Table
CREATE TABLE AuditLog (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeID INT NOT NULL,
    Action VARCHAR(255) NOT NULL,
    TableName VARCHAR(100) NOT NULL,
    RecordID VARCHAR(50),
    Timestamp DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);