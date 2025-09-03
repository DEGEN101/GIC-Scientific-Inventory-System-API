-- Step 1: Seed the StorageType table first.
-- This must be done before seeding the Location table.
INSERT INTO StorageType (TypeName, Description) VALUES
('Shelved', 'Locations with defined shelves.'),
('Standalone', 'Locations that are a single, open area.');

-- Step 2: Seed the Location table with the correct StorageTypeID.
-- Assuming the StorageTypeID for 'Shelved' is 1 and 'Standalone' is 2.
-- You can verify these IDs or use a subquery to be more robust.
DECLARE @ShelvedTypeID INT, @StandaloneTypeID INT;
SELECT @ShelvedTypeID = StorageTypeID FROM StorageType WHERE TypeName = 'Shelved';
SELECT @StandaloneTypeID = StorageTypeID FROM StorageType WHERE TypeName = 'Standalone';

INSERT INTO Location (Name, Description, StorageTypeID) VALUES
('Production Room', 'Room for finished goods production.', @ShelvedTypeID),
('Outside Storeroom', 'General purpose standalone storage.', @StandaloneTypeID),
('Raw Materials Storeroom', 'Room for raw material sheets and rolls.', @ShelvedTypeID);

-- Step 3: Seed the Shelf table for locations that have shelves.
-- This must be done before seeding the Inventory table with shelf data.
DECLARE @ProductionRoomID INT, @RawMaterialsRoomID INT;
SELECT @ProductionRoomID = LocationID FROM Location WHERE Name = 'Production Room';
SELECT @RawMaterialsRoomID = LocationID FROM Location WHERE Name = 'Raw Materials Storeroom';

-- Updated INSERT statement for the new Shelf table structure
INSERT INTO Shelf (LocationID, ShelfRow, ShelfColumn, Name) VALUES
(@ProductionRoomID, 'A', '1', 'Finished Goods Shelf'),
(@ProductionRoomID, 'A', '2', 'Packaging Shelf'),
(@RawMaterialsRoomID, 'A', '1', 'QLF Paper Rolls'),
(@RawMaterialsRoomID, 'B', '2', 'QLS Paper Rolls'),
(@RawMaterialsRoomID, 'B', '3', 'Cardboard Sheets');

-- Step 4: Update the Inventory data to reference the new Location and Shelf IDs.
-- The Inventory table now points to a specific ShelfID or NULL if there are no shelves.
DECLARE @OutsideStoreroomID INT, @ProductionRoomShelf1ID INT, @RawMaterialsShelf2ID INT;
SELECT @OutsideStoreroomID = LocationID FROM Location WHERE Name = 'Outside Storeroom';

-- Updated SELECT statements to find the correct ShelfID
SELECT @ProductionRoomShelf1ID = ShelfID FROM Shelf WHERE LocationID = @ProductionRoomID AND ShelfRow = 'A' AND ShelfColumn = '1';
SELECT @RawMaterialsShelf2ID = ShelfID FROM Shelf WHERE LocationID = @RawMaterialsRoomID AND ShelfRow = 'B' AND ShelfColumn = '2';

-- Insert new inventory records
INSERT INTO Inventory (LocationID, ShelfID, StockItemID, Quantity, MinimumQuantity, BatchNumber, IsPartial) VALUES
    -- Item 1 is in the Outside Storeroom (standalone, so ShelfID is NULL)
    (@OutsideStoreroomID, NULL, 1, 1000, 200, 'BATCH001', 0),
    
    -- Item 5 is also in the Outside Storeroom (standalone)
    (@OutsideStoreroomID, NULL, 1, 500, 200, 'BATCH002', 0),
    
    -- Item 2 is in the Production Room on Shelf A, Column 1
    (@ProductionRoomID, @ProductionRoomShelf1ID, 2, 200, 100, 'BATCH003', 1),
    
    -- Item 3 is in the Raw Materials Storeroom on Shelf B, Column 2
    (@RawMaterialsRoomID, @RawMaterialsShelf2ID, 3, 150, 75, 'BATCH004', 0);