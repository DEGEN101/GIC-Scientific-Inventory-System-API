module.exports = (sql, poolPromise) => {
    const Inventory = {
        create: async (newInventoryItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("StockItemID", sql.Int, newInventoryItem.StockItemID)
            .input("Quantity", sql.Decimal(10, 2), newInventoryItem.Quantity)
            .input("MinimumQuantity", sql.Decimal(10, 2), newInventoryItem.MinimumQuantity)
            .input("BatchNumber", sql.VarChar(50), newInventoryItem.BatchNumber)
            .input("isPartial", sql.Bit, newInventoryItem.isPartial ?? false)
            .input("LocationID", sql.Int, newInventoryItem.LocationID)
            .input("ShelfID", sql.Int, newInventoryItem.ShelfID)
            .query("INSERT INTO Inventory (StockItemID, Quantity, MinimumQuantity, BatchNumber, isPartial, LocationID, ShelfID) \
                OUTPUT INSERTED.* VALUES (@StockItemID, @Quantity, @MinimumQuantity, @BatchNumber, @isPartial, @LocationID, @ShelfID)");
            
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
            .query("SELECT * FROM Inventory");

            return result.recordset;
        },

        getAllFull: async () => {
            try {
                const pool = await poolPromise;
                const result = await pool.request()
                    .query(`
                        SELECT 
                            Inventory.InventoryID,
                            Inventory.StockItemID,
                            StockItem.Name AS StockItemName,
                            StockItem.SKU AS StockItemSKU,
                            Inventory.MinimumQuantity,
                            Inventory.Quantity,
                            UnitOfMeasurement.Name AS UoMName,
                            Inventory.BatchNumber,
                            Inventory.Status,
                            Inventory.IsPartial,
                            Location.Name AS LocationName,
                            Shelf.ShelfID,
                            Shelf.Name AS ShelfName,
                            Shelf.ShelfRow,
                            Shelf.ShelfColumn
                        FROM Inventory
                        LEFT JOIN StockItem ON StockItem.StockItemID = Inventory.StockItemID
                        LEFT JOIN UnitOfMeasurement ON UnitOfMeasurement.UoMID = StockItem.BaseUoMID
                        LEFT JOIN Location ON Location.LocationID = Inventory.LocationID
                        LEFT JOIN Shelf ON Shelf.ShelfID = Inventory.ShelfID;
                    `);
                return result.recordset;
            } catch (error) {
                throw new Error(`Database error: ${error.message}`);
            }
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .query("Select * From Inventory WHERE InventoryID = @id");

            return result.recordset[0];
        },

        findByLocationId: async (locationId) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, locationId)
            .query("Select * From Inventory WHERE LocationID = @id");

            return result.recordset;
        },

        findByShelfId: async (shelfId) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, shelfId)
            .query("Select * From Inventory WHERE ShelfID = @id");
            
            return result.recordset;
        },

        updateById: async (id, inventoryItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .input("StockItemID", sql.Int, inventoryItem.StockItemID)
            .input("Quantity", sql.Decimal(10, 2), inventoryItem.Quantity)
            .input("MinimumQuantity", sql.Decimal(10, 2), inventoryItem.MinimumQuantity)
            .input("BatchNumber", sql.VarChar(50), inventoryItem.BatchNumber)
            .input("isPartial", sql.Bit, inventoryItem.isPartial ?? false)
            .input("LocationID", sql.Int, inventoryItem.LocationID)
            .input("ShelfID", sql.Int, inventoryItem.ShelfID)
            .query("UPDATE Inventory SET  StockItemID = @StockItemID, Quantity = @Quantity, MinimumQuantity = @MinimumQuantity,\
                BatchNumber = @BatchNumber, isPartial = @isPartial, LocationID = @LocationID, ShelfID = @ShelfID WHERE InventoryID = @id");
            
            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Inventory WHERE InventoryID = @id")

            return result.rowsAffected[0];
        }
    };

    return Inventory;
}
