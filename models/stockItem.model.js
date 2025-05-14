module.exports = (sql, poolPromise) => {
    const StockItem = {
        create: async (newStockItem) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("Name", sql.VarChar, newStockItem.Name)
            .input("SKU", sql.VarChar, newStockItem.SKU)
            .input("Description", sql.Text, newStockItem.Description)
            .input("StockItemCategoryID", sql.Int, newStockItem.StockItemCategoryID)
            .input("BaseUoMID", sql.Int, newStockItem.BaseUoMID)
            .input("GroupID", sql.Int, newStockItem.GroupID)
            .query("INSERT INTO StockItem (Name, SKU, Description, StockItemCategoryID, BaseUoMID, GroupID) \
                OUTPUT INSERTED.* VALUES (@Name, @SKU, @Description, @StockItemCategoryID, @BaseUoMID, @GroupID)");
            
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
            .query("SELECT * FROM StockItem");
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
            .input("StockItemCategoryID", sql.Int, stockItem.StockItemCategoryID)
            .input("BaseUoMID", sql.Int, stockItem.BaseUoMID)
            .input("GroupID", sql.Int, stockItem.GroupID)
            .query("UPDATE StockItem SET Name = @Name, SKU = @SKU, Description = @Description, StockItemCategoryID = @StockItemCategoryID, \
                BaseUoMID = @BaseUoMID, GroupID = @GroupID WHERE StockItemID = @id");

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