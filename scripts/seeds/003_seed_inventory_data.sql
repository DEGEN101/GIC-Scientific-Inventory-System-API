INSERT INTO Location (Name) VALUES 
    ('Production Room'), 
    ('Outside Storeroom'),
    ('Raw Materials Storeroom');

INSERT INTO Inventory (LocationID, UoMID, StockItemID, Quantity, BatchNumber, IsPartial) VALUES
    (2, 1, 1, 1000, 'BATCH001', 0),
    (2, 1, 5, 500, 'BATCH002', 0),
    (1, 2, 2, 200, 'BATCH003', 1),
    (3, 3, 3, 150, 'BATCH004', 0);