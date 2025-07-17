Use [GIC Inventory Database];

INSERT INTO Employees (FirstName, Surname, Role, Email, PhoneNumber)
VALUES
  ('John', 'Doe', 'Lab Technician', 'john@gicsci.com', '0100000001'),
  ('Sarah', 'Smith', 'Warehouse Manager', 'sarah@gicsci.com', '0100000002'),
  ('Mike', 'Jones', 'Procurement Officer', 'mike@gicsci.com', '0100000003'),
  ('Emily', 'White', 'Production Supervisor', 'emily@gicsci.com', '0100000004');

INSERT INTO Users (EmployeeID, Username, PasswordHash)
VALUES 
  (1, 'john.doe', 'HASHED_PASSWORD_HERE'),
  (2, 'sarah.smith', 'HASHED_PASSWORD_HERE'),
  (3, 'mike.jones', 'HASHED_PASSWORD_HERE'),
  (4, 'emily.white', 'HASHED_PASSWORD_HERE');