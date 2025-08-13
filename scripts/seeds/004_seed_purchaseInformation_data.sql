INSERT INTO Supplier (Name, Email, PhoneNumber)
VALUES 
    ('LabSupplyCo', 'sales@labsupplyco.com', '0112233445'),
    ('ANOW', 'ANOW@gmail.com', '0213456874');

INSERT INTO PurchaseOrder (SupplierID, OrderDate, Status)
VALUES 
    (1, '2025-05-01', 'Delivered');

INSERT INTO PurchaseOrderDetails (POID, StockItemID, Quantity, UoMID)
VALUES 
    (1, 1, 1000, 1),
    (1, 5, 500, 1);

INSERT INTO StockItemSupplier (StockItemID, SupplierID, IsPreferred) VALUES
    (1, 1, 1),  -- QLVF-RL from Supplier 1
    (2, 1, 0),  -- QLVF-20S from Supplier 1
    (3, 1, 0),  -- QLVF-25S from Supplier 1
    (4, 2, 1),  -- GSSLGIC from Supplier 2
    (5, 2, 0);  -- GSBLGIC from Supplier 2