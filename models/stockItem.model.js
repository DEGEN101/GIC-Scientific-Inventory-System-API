module.exports = (sql, poolPromise) => {
    const StockItem = {
        create: async (newStockItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("Name", sql.VarChar, newStockItem.Name)
            .input("SKU", sql.VarChar, newStockItem.SKU)
            .input("Description", sql.Text, newStockItem.Description)
            .input("MinimumQuantity", sql.Decimal(10, 2), newStockItem.MinimumQuantity)
            .input("BaseUoMID", sql.Int, newStockItem.BaseUoMID)
            .input("StockItemGroupID", sql.Int, newStockItem.StockItemGroupID)
            .query("INSERT INTO StockItem (Name, SKU, Description, MinimumQuantity, StockItemGroupID, BaseUoMID) \
                OUTPUT INSERTED.* VALUES (@Name, @SKU, @Description, @MinimumQuantity, @StockItemGroupID, @BaseUoMID)");
            
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
            .query("SELECT * FROM StockItem");
            return result.recordset;
        },

        getAllFull: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
            .query(`
                SELECT 
                    StockItem.StockItemID,
                    StockItem.Name,
                    StockItem.SKU,
                    StockItem.Description,
                    StockItem.MinimumQuantity,
                    StockItemCategory.Name AS CategoryName,
                    StockItemGroup.Name AS GroupName,
                    UnitOfMeasurement.Name AS BaseUoMName
                FROM StockItem
                LEFT JOIN StockItemGroup ON StockItemGroup.StockItemGroupID = StockItem.StockItemGroupID
                LEFT JOIN StockItemCategory ON StockItemCategory.StockItemCategoryID = StockItemGroup.StockItemCategoryID
                LEFT JOIN UnitOfMeasurement ON UnitOfMeasurement.UoMID = StockItem.BaseUoMID;
            `);
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM StockItem WHERE StockItemID = @id");

            return result.recordset[0];
        },

        findBySKU: async (sku) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("SKU", sql.VarChar, sku)
            .query("SELECT * FROM StockItem WHERE SKU = @SKU");

            return result.recordset[0];
        },

        updateById: async (id, stockItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .input("Name", sql.VarChar, stockItem.Name)
            .input("SKU", sql.VarChar, stockItem.SKU)
            .input("Description", sql.Text, stockItem.Description)
            .input("MinimumQuantity", sql.Decimal(10, 2), stockItem.MinimumQuantity)
            .input("BaseUoMID", sql.Int, stockItem.BaseUoMID)
            .input("StockItemGroupID", sql.Int, stockItem.StockItemGroupID)
            .query("UPDATE StockItem SET Name = @Name, SKU = @SKU, Description = @Description, StockItemGroupID = @StockItemGroupID, \
                MinimumQuantity = @MinimumQuantity, BaseUoMID = @BaseUoMID WHERE StockItemID = @id");

            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM StockItem WHERE StockItemID = @id');
            
            return result.rowsAffected[0];
        }
    }

    return StockItem;
}