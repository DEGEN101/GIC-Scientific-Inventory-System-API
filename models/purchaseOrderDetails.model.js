module.exports = (sql, poolPromise) => {
    const PurchaseOrderDetails = {
        create: async (detail) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("POID", sql.Int, detail.POID)
                .input("StockItemID", sql.Int, detail.StockItemID)
                .input("Quantity", sql.Decimal(10, 2), detail.Quantity)
                .input("UoMID", sql.Int, detail.UoMID)
                .input("PackagingTypeID", sql.Int, detail.PackagingTypeID)
                .query("INSERT INTO PurchaseOrderDetails (POID, StockItemID, Quantity, UoMID, PackagingTypeID) \
                    OUTPUT INSERTED.* VALUES (@POID, @StockItemID, @Quantity, @UoMID, @PackagingTypeID)");
            
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query("SELECT * FROM PurchaseOrderDetails");

            return result.recordset;
        },

        findByKey: async (poid, stockItemId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("POID", sql.Int, poid)
                .input("StockItemID", sql.Int, stockItemId)
                .query("SELECT * FROM PurchaseOrderDetails WHERE POID = @POID AND StockItemID = @StockItemID");

            return result.recordset[0];
        },

        updateByKey: async (poid, stockItemId, detail) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("POID", sql.Int, poid)
                .input("StockItemID", sql.Int, stockItemId)
                .input("Quantity", sql.Decimal(10, 2), detail.Quantity)
                .input("UoMID", sql.Int, detail.UoMID)
                .input("PackagingTypeID", sql.Int, detail.PackagingTypeID)
                .query("UPDATE PurchaseOrderDetails SET Quantity = @Quantity, UoMID = @UoMID, \
                    PackagingTypeID = @PackagingTypeID WHERE POID = @POID AND StockItemID = @StockItemID");
                        
            return result.rowsAffected[0];
        },

        remove: async (poid, stockItemId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("POID", sql.Int, poid)
                .input("StockItemID", sql.Int, stockItemId)
                .query("DELETE FROM PurchaseOrderDetails WHERE POID = @POID AND StockItemID = @StockItemID");

            return result.rowsAffected[0];
        }
    };

    return PurchaseOrderDetails;
};
