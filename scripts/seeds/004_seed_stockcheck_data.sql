-- =======================================
-- Step 1: Seed StockCheck (header/session)
-- =======================================

-- Assume EmployeeID 1 and 2 exist (system users who do stock checks).
-- Assume LocationIDs are seeded (Production Room, Raw Materials Storeroom, etc.)
DECLARE @ProductionRoomID INT, @RawMaterialsRoomID INT;
SELECT @ProductionRoomID = LocationID FROM Location WHERE Name = 'Production Room';
SELECT @RawMaterialsRoomID = LocationID FROM Location WHERE Name = 'Raw Materials Storeroom';

INSERT INTO StockCheck (LocationID, EmployeeID, StartDate, EndDate, Status)
VALUES
(@ProductionRoomID, 1, GETDATE(), NULL, 'In Progress'),
(@RawMaterialsRoomID, 2, DATEADD(DAY, -7, GETDATE()), DATEADD(DAY, -7, GETDATE()), 'Completed');

-- Capture IDs
DECLARE @StockCheck1 INT, @StockCheck2 INT;
SELECT @StockCheck1 = StockCheckID FROM StockCheck WHERE LocationID = @ProductionRoomID AND Status = 'In Progress';
SELECT @StockCheck2 = StockCheckID FROM StockCheck WHERE LocationID = @RawMaterialsRoomID AND Status = 'Completed';

-- =======================================
-- Step 2: Seed StockCheckLine
-- =======================================

-- Get some inventory records
DECLARE @Inv1 INT, @Inv2 INT;
SELECT TOP 1 @Inv1 = InventoryID FROM Inventory WHERE BatchNumber = 'BATCH003'; -- Production Room stock
SELECT TOP 1 @Inv2 = InventoryID FROM Inventory WHERE BatchNumber = 'BATCH004'; -- Raw Materials stock

INSERT INTO StockCheckLine (StockCheckID, InventoryID, ExpectedQuantity, CountedQuantity)
VALUES
(@StockCheck1, @Inv1, 200, 198), -- slight shortage, still in progress
(@StockCheck2, @Inv2, 150, 160); -- overcount, completed check

-- Capture line IDs
DECLARE @Line1 INT, @Line2 INT;
SELECT TOP 1 @Line1 = StockCheckLineID FROM StockCheckLine WHERE StockCheckID = @StockCheck1;
SELECT TOP 1 @Line2 = StockCheckLineID FROM StockCheckLine WHERE StockCheckID = @StockCheck2;

-- =======================================
-- Step 3: Seed StockCheckAdjustment
-- =======================================

-- Adjustment for completed check (line2 discrepancy)
INSERT INTO StockCheckAdjustment (StockCheckLineID, AdjustmentQuantity, EmployeeID, Notes)
VALUES
(@Line2, 10, 2, 'Adjusted to match counted quantity after verification');

-- =======================================
-- Step 4: Seed StockMovement (to log actual system adjustments)
-- =======================================

-- Example: New stock arrival into Raw Materials Storeroom (Purchase)
DECLARE @NewInventoryID INT;
INSERT INTO Inventory (LocationID, ShelfID, StockItemID, Quantity, MinimumQuantity, BatchNumber, IsPartial)
VALUES (@RawMaterialsRoomID, NULL, 4, 300, 50, 'BATCH005', 0);
SET @NewInventoryID = SCOPE_IDENTITY();

INSERT INTO StockMovement (FromInventoryID, ToInventoryID, Quantity, MovementType, EmployeeID, ReferenceID, Notes)
VALUES
(NULL, @NewInventoryID, 300, 'Purchase', 1, NULL, 'New batch of raw material received'),

-- Example: Stock check adjustment movement
(NULL, @Inv2, 10, 'StockCheckAdjustment', 2, @StockCheck2, 'Adjusted stock after discrepancy');
