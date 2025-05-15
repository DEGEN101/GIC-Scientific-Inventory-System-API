module.exports = (sql, poolPromise) => {
    const Inventory = {
        create: async (newInventoryItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("StockItemID", sql.Int, newInventoryItem.StockItemID)
            .input("Quantity", sql.Decimal(10, 2), newInventoryItem.Quantity)
            .input("UoMID", sql.Int, newInventoryItem.UoMID)
            .input("BatchNumber", sql.VarChar(50), newInventoryItem.BatchNumber)
            .input("isPartial", sql.Bit, newInventoryItem.isPartial ?? false)
            .input("LocationID", sql.Int, newInventoryItem.LocationID)
            .query("INSERT INTO Inventory (StockItemID, Quantity, UoMID, BatchNumber, isPartial, LocationID) \
                OUTPUT INSERTED.* VALUES (@StockItemID, @Quantity, @UoMID, @BatchNumber, @isPartial, @LocationID)");
            
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
            .query("SELECT * FROM Inventory");

            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .query("Select * From Inventory WHERE InventoryID = @id");

            return result.recordset[0];
        },

        updateById: async (id, inventoryItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .input("StockItemID", sql.Int, inventoryItem.StockItemID)
            .input("Quantity", sql.Decimal(10, 2), inventoryItem.Quantity)
            .input("UoMID", sql.Int, inventoryItem.UoMID)
            .input("BatchNumber", sql.VarChar(50), inventoryItem.BatchNumber)
            .input("isPartial", sql.Bit, inventoryItem.isPartial ?? false)
            .input("LocationID", sql.Int, inventoryItem.LocationID)
            .query("UPDATE Inventory SET  StockItemID = @StockItemID, Quantity = @Quantity, UoMID = @UoMID, \
                BatchNumber = @BatchNumber, isPartial = @isPartial, LocationID = @LocationID WHERE InventoryID = @id");
            
            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Inventory WHERE InventoryID = @id")
        }
    };

    return Inventory;
}
