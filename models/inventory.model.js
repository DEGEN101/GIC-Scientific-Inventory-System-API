module.exports = (sql, poolPromise) => {
    const Inventory = {
        create: async (newInventoryItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("StockItemID", sql.Int, newInventoryItem.StockItemID)
            .input("Quantity", sql.Decimal(10, 2), newInventoryItem.Quantity)
            .input("BatchNumber", sql.VarChar(50), newInventoryItem.BatchNumber)
            .input("isPartial", sql.Bit, newInventoryItem.isPartial ?? false)
            .input("LocationID", sql.Int, newInventoryItem.LocationID)
            .query("INSERT INTO Inventory (StockItemID, Quantity, BatchNumber, isPartial, LocationID) \
                OUTPUT INSERTED.* VALUES (@StockItemID, @Quantity, @BatchNumber, @isPartial, @LocationID)");
            
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
                            v_InventoryStatus.InventoryID,
                            v_InventoryStatus.StockItemID,
                            StockItem.Name AS StockItemName,
                            StockItem.SKU AS StockItemSKU,
                            v_InventoryStatus.MinimumQuantity,
                            v_InventoryStatus.Quantity,
                            UnitOfMeasurement.Name AS UoMName,
                            v_InventoryStatus.BatchNumber,
                            v_InventoryStatus.Status,
                            v_InventoryStatus.IsPartial,
                            Location.Name AS LocationName
                        FROM v_InventoryStatus
                        LEFT JOIN StockItem ON StockItem.StockItemID = v_InventoryStatus.StockItemID
                        LEFT JOIN UnitOfMeasurement ON UnitOfMeasurement.UoMID = StockItem.BaseUoMID
                        LEFT JOIN Location ON Location.LocationID = v_InventoryStatus.LocationID;
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

        updateById: async (id, inventoryItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .input("StockItemID", sql.Int, inventoryItem.StockItemID)
            .input("Quantity", sql.Decimal(10, 2), inventoryItem.Quantity)
            .input("BatchNumber", sql.VarChar(50), inventoryItem.BatchNumber)
            .input("isPartial", sql.Bit, inventoryItem.isPartial ?? false)
            .input("LocationID", sql.Int, inventoryItem.LocationID)
            .query("UPDATE Inventory SET  StockItemID = @StockItemID, Quantity = @Quantity,\
                BatchNumber = @BatchNumber, isPartial = @isPartial, LocationID = @LocationID WHERE InventoryID = @id");
            
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
