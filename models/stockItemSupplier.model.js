module.exports = (sql, poolPromise) => {
    const StockItemSupplier = {
        create: async (value) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemID', sql.Int, value.StockItemID)
                .input('SupplierID', sql.Int, value.SupplierID)
                .input('IsPreferred', sql.Bit, value.isPreferred)
                .query('INSERT INTO StockItemSupplier (StockItemID, SupplierID, IsPreferred) \
                    OUTPUT INSERTED.* VALUES (@StockItemID, @SupplierID, @IsPreferred)');

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM StockItemSupplier');
            return result.recordset;
        },

        findByKey: async (stockItemId, supplierID) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemID', sql.Int, stockItemId)
                .input('SupplierID', sql.Int, supplierID)
                .query('SELECT * FROM StockItemSupplier WHERE StockItemID = @StockItemID AND \
                    SupplierID = @SupplierID');

            return result.recordset[0];
        },

        updateByKey: async (stockItemId, supplierID, isPreferredValue) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemID', sql.Int, stockItemId)
                .input('SupplierID', sql.Int, supplierID)
                .input('IsPreferred', sql.Bit, isPreferredValue)
                .query('UPDATE StockItemSupplier SET IsPreferred = @IsPreferred WHERE \
                    StockItemID = @StockItemID AND SupplierID = @SupplierID');

            return result.rowsAffected[0];
        },

        remove: async (stockItemId, supplierID) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemID', sql.Int, stockItemId)
                .input('SupplierID', sql.Int, supplierID)
                .query('DELETE FROM StockItemSupplier WHERE StockItemID = @StockItemID AND \
                    SupplierID = @SupplierID');

            return result.rowsAffected[0];
        }
    };

    return StockItemSupplier;
};
