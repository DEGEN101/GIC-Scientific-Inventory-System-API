USE [GIC Inventory Database];

-- ====================================================================
-- 1. ProductionOrder INSERTS (Total 4 Examples)
-- ====================================================================

INSERT INTO ProductionOrder (QuantityToProduce, ProductionDate, Status, CreatedBy, Notes, InvoiceNumber)
VALUES (100.00, GETDATE(), 'Complete', 1, 'Batch for routine filter paper restock', 'INV-2025-001');

INSERT INTO ProductionOrder (QuantityToProduce, ProductionDate, Status, CreatedBy, Notes, InvoiceNumber)
VALUES (500.00, DATEADD(day, -7, GETDATE()), 'Complete', 2, 'Urgent run for solvent Grade A', 'INV-2025-002');

INSERT INTO ProductionOrder (QuantityToProduce, ProductionDate, Status, CreatedBy, Notes, InvoiceNumber)
VALUES (20.00, GETDATE(), 'Complete', 3, 'Sample batch for new product line', 'INV-2025-003');

INSERT INTO ProductionOrder (QuantityToProduce, ProductionDate, Status, CreatedBy, Notes, InvoiceNumber)
VALUES (1500.00, DATEADD(month, 1, GETDATE()), 'Complete', 1, 'Q4 scheduled production of primary reagent', 'PO-2025-004');


-- ====================================================================
-- 2. Product INSERTS (Total 4 Examples)
-- Assumes ProductionOrderID auto-increments: 1, 2, 3, 4
-- ====================================================================

-- Example 1 (Original - Links to ProductionOrderID = 1)
INSERT INTO Product (ProductionOrderID, Name, BatchNumber, Quantity, Dimensions)
VALUES (1, 'Filter Paper Grade 40', 'FP-40-2025-10A', 100.00, '10x10 cm');

-- Example 2 (Links to ProductionOrderID = 2)
INSERT INTO Product (ProductionOrderID, Name, BatchNumber, Quantity, Dimensions)
VALUES (2, 'Solvent Grade A', 'SA-A-2025-10A', 500.00, '1 Liter');

-- Example 3 (Links to ProductionOrderID = 3)
INSERT INTO Product (ProductionOrderID, Name, BatchNumber, Quantity, Dimensions)
VALUES (3, 'New Catalyst Sample', 'NCS-2025-09B', 20.00, '100 Gram');

-- Example 4 (Links to ProductionOrderID = 4)
INSERT INTO Product (ProductionOrderID, Name, BatchNumber, Quantity, Dimensions)
VALUES (4, 'Primary Reagent Z', 'PRZ-2025-11C', 1500.00, '250 ml');


-- ====================================================================
-- 3. ProductionConsumption INSERTS (Total 4 Examples)
-- InventoryID is limited to 4 (i.e., 1, 2, 3, 4)
-- ====================================================================

-- Example 1 (Original - Links to ProductionOrderID = 1)
INSERT INTO ProductionConsumption (ProductionOrderID, InventoryID, QuantityUsed)
VALUES (1, 1, 0.50); -- Used half a unit of InventoryID 1 (e.g., a roll)

-- Example 2 (Links to ProductionOrderID = 2)
INSERT INTO ProductionConsumption (ProductionOrderID, InventoryID, QuantityUsed)
VALUES (2, 2, 450.00); -- Used 450 units of InventoryID 2

-- Example 3 (Links to ProductionOrderID = 3)
INSERT INTO ProductionConsumption (ProductionOrderID, InventoryID, QuantityUsed)
VALUES (3, 3, 5.00); -- Used 5 units of InventoryID 3

-- Example 4 (Links to ProductionOrderID = 4)
INSERT INTO ProductionConsumption (ProductionOrderID, InventoryID, QuantityUsed)
VALUES (4, 4, 150.00); -- Used 150 units of InventoryID 4


-- ====================================================================
-- 4. ProductionWaste INSERTS (Total 4 Examples)
-- InventoryID is limited to 4 (i.e., 1, 2, 3, 4)
-- ====================================================================

DECLARE @GramsUoMID INT;
SELECT @GramsUoMID = UoMID FROM UnitOfMeasurement WHERE Name = 'grams';

-- Example 1 (Original - Links to ProductionOrderID = 1)
INSERT INTO ProductionWaste (ProductionOrderID, InventoryID, QuantityWasted, Reason, UoMID)
VALUES (1, 1, 0.05, 'Torn edge waste', @GramsUoMID);  -- 0.05 units wasted (UoMID=2: Assuming 'rolls' or similar)

-- Example 2 (Links to ProductionOrderID = 2)
INSERT INTO ProductionWaste (ProductionOrderID, InventoryID, QuantityWasted, Reason, UoMID)
VALUES (2, 2, 10.00, 'Spillage during mixing', @GramsUoMID);  -- 10 units wasted (UoMID=1: Units)

-- Example 3 (Links to ProductionOrderID = 3)
INSERT INTO ProductionWaste (ProductionOrderID, InventoryID, QuantityWasted, Reason, UoMID)
VALUES (3, 3, 0.25, 'Expired material found in batch', @GramsUoMID); -- 0.25 units wasted (UoMID=3: Grams)

-- Example 4 (Links to ProductionOrderID = 4)
INSERT INTO ProductionWaste (ProductionOrderID, InventoryID, QuantityWasted, Reason, UoMID)
VALUES (4, 4, 5.00, 'Defective packaging components', @GramsUoMID);  -- 5 units wasted (UoMID=1: Units)