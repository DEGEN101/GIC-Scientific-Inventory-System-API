use [GIC Inventory Database];

-- Location Table
CREATE TABLE Location (
    LocationID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
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
    GroupID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(255)
);

-- StockItem Table
CREATE TABLE StockItem (
    StockItemID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    SKU VARCHAR(50) NOT NULL UNIQUE,
    Description TEXT,
    StockItemCategoryID INT,
    BaseUoMID INT NOT NULL,
    GroupID INT NOT NULL,
    FOREIGN KEY (StockItemCategoryID) REFERENCES StockItemCategory(StockItemCategoryID) ON DELETE SET NULL,
    FOREIGN KEY (BaseUoMID) REFERENCES UnitOfMeasurement(UoMID),
    FOREIGN KEY (GroupID) REFERENCES StockItemGroup(GroupID)
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
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID),
    FOREIGN KEY (AttributeID) REFERENCES StockItemAttribute(AttributeID)
);

-- Inventory Table
CREATE TABLE Inventory (
    InventoryID INT IDENTITY(1,1) PRIMARY KEY,
    StockItemID INT NOT NULL,
    Quantity DECIMAL(10, 2) NOT NULL,
    UoMID INT NOT NULL,
    BatchNumber VARCHAR(50),
    IsPartial BIT DEFAULT 0,
    LocationID INT,
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID) ON DELETE CASCADE,
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID),
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID) ON DELETE SET NULL
);

-- Supplier Table
CREATE TABLE Supplier (
    SupplierID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    PhoneNumber NCHAR(10)
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
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID),
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

-- ProductionOrder Table
CREATE TABLE ProductionOrder (
    ProductionOrderID INT IDENTITY(1,1) PRIMARY KEY,
    StockItemID INT NOT NULL,
    QuantityToProduce DECIMAL(10, 2) NOT NULL,
    ScheduledDate DATE,
    Status VARCHAR(50),
    EmployeeID INT,
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE SET NULL
);

-- ProductionWasteLog Table
CREATE TABLE ProductionWasteLog (
    WasteLogID INT IDENTITY(1,1) PRIMARY KEY,
    ProductionOrderID INT NOT NULL,
    StockItemID INT NOT NULL,
    QuantityWasted DECIMAL(10, 2),
    Reason TEXT,
    UoMID INT NOT NULL,
    FOREIGN KEY (ProductionOrderID) REFERENCES ProductionOrder(ProductionOrderID) ON DELETE CASCADE,
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID),
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID)
);

-- BillOfMaterials Table
CREATE TABLE BillOfMaterials (
    BOMID INT IDENTITY(1,1) PRIMARY KEY,
    StockItemID INT NOT NULL,
    RawMaterialID INT NOT NULL,
    QuantityRequired DECIMAL(10, 2) NOT NULL,
    UoMID INT NOT NULL,
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID),
    FOREIGN KEY (RawMaterialID) REFERENCES StockItem(StockItemID),
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID)
);

-- ProductionConsumption Table
CREATE TABLE ProductionConsumption (
    ProductionOrderID INT NOT NULL,
    StockItemID INT NOT NULL,
    QuantityUsed DECIMAL(10, 2) NOT NULL,
    UoMID INT NOT NULL,
    SourceInventoryID INT,
    PRIMARY KEY (ProductionOrderID, StockItemID),
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID),
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID),
    FOREIGN KEY (SourceInventoryID) REFERENCES Inventory(InventoryID),
    FOREIGN KEY (ProductionOrderID) REFERENCES ProductionOrder(ProductionOrderID) ON DELETE CASCADE
);

-- FinishedGoodsOutput Table
CREATE TABLE FinishedGoodsOutput (
    OutputID INT IDENTITY(1,1) PRIMARY KEY,
    ProductionOrderID INT NOT NULL,
    StockItemID INT NOT NULL,
    QuantityProduced DECIMAL(10, 2) NOT NULL,
    UoMID INT NOT NULL,
    BatchNumber VARCHAR(50),
    FOREIGN KEY (ProductionOrderID) REFERENCES ProductionOrder(ProductionOrderID) ON DELETE CASCADE,
    FOREIGN KEY (StockItemID) REFERENCES StockItem(StockItemID),
    FOREIGN KEY (UoMID) REFERENCES UnitOfMeasurement(UoMID)
);

-- Customers Table
CREATE TABLE Customer (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    Role VARCHAR(50) NOT NULL,
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