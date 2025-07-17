module.exports = (sql, poolPromise) => {
    const Product = {
        create: async (product) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("ProductionOrderID", sql.Int, product.ProductionOrderID)
                .input("StockItemID", sql.Int, product.StockItemID)
                .input("QuantityProduced", sql.Decimal(10, 2), product.QuantityProduced)
                .input("UoMID", sql.Int, product.UoMID)
                .input("BatchNumber", sql.VarChar, product.BatchNumber)
                .query("INSERT INTO Product (ProductionOrderID, StockItemID, QuantityProduced, UoMID, BatchNumber) \
                    OUTPUT INSERTED.* VALUES (@ProductionOrderID, @StockItemID, @QuantityProduced, @UoMID, @BatchNumber)");

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query("SELECT * FROM Product");

            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM Product WHERE ProductID = @id");

            return result.recordset[0];
        },

        updateById: async (id, product) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("ProductionOrderID", sql.Int, product.ProductionOrderID)
                .input("StockItemID", sql.Int, product.StockItemID)
                .input("QuantityProduced", sql.Decimal(10, 2), product.QuantityProduced)
                .input("UoMID", sql.Int, product.UoMID)
                .input("BatchNumber", sql.VarChar, product.BatchNumber)
                .query("UPDATE Product SET ProductionOrderID = @ProductionOrderID, StockItemID = @StockItemID, \
                    QuantityProduced = @QuantityProduced, UoMID = @UoMID, BatchNumber = @BatchNumber WHERE ProductID = @id");

            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM Product WHERE ProductID = @id");
                
            return result.rowsAffected[0];
        }
    };

    return Product;
};
