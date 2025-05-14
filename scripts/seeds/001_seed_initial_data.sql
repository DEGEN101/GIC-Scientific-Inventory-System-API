Use [GIC Inventory Database];

-- =======================================
-- SCENARIO 1: Initial Stock Setup
-- =======================================
INSERT INTO StockItemCategory (Name) VALUES 
    ('FilterPaper'), 
    ('Labels');

INSERT INTO UnitOfMeasurement (Name, IsBaseUnit) VALUES  
    ('Roll', 1),
    ('20-Stack', 0),
    ('25-Stack', 0);

INSERT INTO StockItemGroup (GroupID, Name, Description) VALUES
    (1, 'QLFV', 'High-purity cellulose filter paper for qualitative analysis. Moderate flow rate, fine particle retention.'),
    (2, 'GIC Scientific Label', 'Custom GIC Scientific Label');

INSERT INTO StockItem (SKU, Name, Description, StockItemCategoryID, BaseUoMID, GroupID)
VALUES
    ('QLVF-RL', 'QLVF Roll', 'High-purity cellulose filter paper, moderate flow, fine retention.', 1, 1, 1),
    ('QLVF-20S', 'QLVF 20-Stack', 'High-purity cellulose filter paper, moderate flow, fine retention.', 1, 2, 1),
    ('QLVF-25S-1', 'QLVF 25-Stack', 'High-purity cellulose filter paper, moderate flow, fine retention.', 1, 3, 1),
    ('QLVF-25S-2', 'QLVF 25-Stack', 'High-purity cellulose filter paper, moderate flow, fine retention.', 1, 3, 1),
    ('GIC Scientific Label', 'GIC Scientific (small)', 'Custom GIC Scientific Label', 2, 1, 2);

INSERT INTO StockItemAttribute (StockItemCategoryID, AttributeName) VALUES
    (1, 'Supplier Grade'),
    (2, 'Size');

INSERT INTO StockItemAttributeValue (StockItemID, AttributeID, AttributeValue) VALUES
    (1, 1, '609'),
    (2, 1, '609'),
    (3, 1, '609'),
    (4, 1, '609'),
    (5, 2, '55mmx22mm');

INSERT INTO Location (Name) VALUES 
    ('Production Room'), 
    ('Outside Storeroom'),
    ('Raw Materials Storeroom');

INSERT INTO Supplier (Name, Email, PhoneNumber)
VALUES 
    ('LabSupplyCo', 'sales@labsupplyco.com', '0112233445');

INSERT INTO PurchaseOrder (SupplierID, OrderDate, Status)
VALUES 
    (1, '2025-05-01', 'Delivered');

INSERT INTO PurchaseOrderDetails (POID, StockItemID, Quantity, UoMID)
VALUES 
    (1, 1, 1000, 1),
    (1, 5, 500, 1);

INSERT INTO Inventory (LocationID, UoMID, StockItemID, Quantity, BatchNumber, IsPartial) VALUES
(2, 1, 1, 1000, 'BATCH001', 0),
(2, 1, 5, 500, 'BATCH002', 0),
(1, 2, 2, 200, 'BATCH003', 1),
(3, 3, 3, 150, 'BATCH004', 0);

-- =======================================
-- SCENARIO 1: Initial Stock Setup
-- =======================================
INSERT INTO Employees (FirstName, Surname, Role, Email, PhoneNumber)
VALUES
  ('John', 'Doe', 'Lab Technician', 'john@gicsci.com', '0100000001'),
  ('Sarah', 'Smith', 'Warehouse Manager', 'sarah@gicsci.com', '0100000002'),
  ('Mike', 'Jones', 'Procurement Officer', 'mike@gicsci.com', '0100000003'),
  ('Emily', 'White', 'Production Supervisor', 'emily@gicsci.com', '0100000004');