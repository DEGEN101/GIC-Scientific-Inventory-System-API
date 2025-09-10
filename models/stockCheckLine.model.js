module.exports = (sql, poolPromise) => {
    const StockCheckLine = {
        create: async (line) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockCheckID', sql.Int, line.StockCheckID)
                .input('InventoryID', sql.Int, line.InventoryID)
                .input('ExpectedQuantity', sql.Decimal(10,2), line.ExpectedQuantity)
                .input('CountedQuantity', sql.Decimal(10,2), line.CountedQuantity)
                .query(`
                    INSERT INTO StockCheckLine (StockCheckID, InventoryID, ExpectedQuantity, CountedQuantity)
                    OUTPUT INSERTED.*
                    VALUES (@StockCheckID, @InventoryID, @ExpectedQuantity, @CountedQuantity)
                `);
            return result.recordset[0];
        },

        getByStockCheck: async (stockCheckId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('stockCheckId', sql.Int, stockCheckId)
                .query('SELECT * FROM StockCheckLine WHERE StockCheckID = @stockCheckId');
            return result.recordset;
        },

        markAdjusted: async (lineId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('lineId', sql.Int, lineId)
                .query('UPDATE StockCheckLine SET IsAdjusted = 1 WHERE StockCheckLineID = @lineId');
            return result.rowsAffected[0];
        }
    };
    return StockCheckLine;
};
