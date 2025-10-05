USE [GIC Inventory Database];

-- ProductionOrder
INSERT INTO ProductionOrder (QuantityToProduce, ProductionDate, Status, ProducedBy, Notes, InvoiceNumber)
VALUES (100.00, GETDATE(), 'In Progress', 1, 'Batch for routine filter paper restock', 'INV-2025-001');


-- Product (Finished Product)
INSERT INTO Product (ProductionOrderID, Name, BatchNumber, Quantity, Size)
VALUES (1, 'Filter Paper Grade 40', 'FP-40-2025-10A', 100.00, '10x10 cm');


-- ProductionConsumption
INSERT INTO ProductionConsumption (ProductionOrderID, InventoryID, QuantityUsed)
VALUES (1, 1, 0.50); -- Used half a roll of Grade 40


-- ProductionWaste
INSERT INTO ProductionWaste (ProductionOrderID, InventoryID, QuantityWasted, Reason, UoMID)
VALUES (1, 1, 0.05, 'Torn edge waste', 2);  -- 0.05 rolls wasted