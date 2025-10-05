USE [GIC Inventory Database];
GO
-- Inventory Status view
CREATE VIEW v_InventoryStatus AS
SELECT
    i.InventoryID,
    i.StockItemID,
    i.Quantity,
    si.MinimumQuantity,
    CASE 
        WHEN i.Quantity = 0 THEN 'Out of Stock'
        WHEN i.Quantity < si.MinimumQuantity THEN 'Low Stock'
        WHEN i.Quantity = si.MinimumQuantity THEN 'At Minimum'
        ELSE 'In Stock'
    END AS Status,
    i.BatchNumber,
    i.IsPartial,
    i.LocationID
FROM Inventory i
INNER JOIN StockItem si ON si.StockItemID = i.StockItemID;
