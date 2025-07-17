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
