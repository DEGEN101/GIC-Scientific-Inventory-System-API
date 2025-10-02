INSERT INTO Location (Name, Description) VALUES
('Production Room', 'Room for finished goods production.'),
('Outside Storeroom', 'General purpose standalone storage.'),
('Raw Materials Storeroom', 'Room for raw material sheets and rolls.');


DECLARE @ProductionRoomID INT, @RawMaterialsRoomID INT, @OutsideStoreroomID INT;
SELECT @ProductionRoomID = LocationID FROM Location WHERE Name = 'Production Room';
SELECT @RawMaterialsRoomID = LocationID FROM Location WHERE Name = 'Raw Materials Storeroom';
SELECT @OutsideStoreroomID = LocationID FROM Location WHERE Name = 'Outside Storeroom';

-- Insert new inventory records
INSERT INTO Inventory (LocationID, StockItemID, Quantity, BatchNumber, IsPartial) VALUES
    -- Item 1 is in the Outside Storeroom
    (@OutsideStoreroomID, 1, 1000, 'BATCH001', 0),
    
    -- Item 5 is also in the Outside Storeroom 
    (@OutsideStoreroomID, 1, 500, 'BATCH002', 0),
    
    -- Item 2 is in the Production Room
    (@ProductionRoomID, 2, 200, 'BATCH003', 1),
    
    -- Item 3 is in the Raw Materials Storeroom
    (@RawMaterialsRoomID, 3, 150, 'BATCH004', 0);