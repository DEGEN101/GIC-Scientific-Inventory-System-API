module.exports = (sql, poolPromise) => {
    const StockCheckAdjustment = {
        create: async (adjustment) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockCheckLineID', sql.Int, adjustment.StockCheckLineID)
                .input('AdjustmentQuantity', sql.Decimal(10,2), adjustment.AdjustmentQuantity)
                .input('EmployeeID', sql.Int, adjustment.EmployeeID)
                .input('Notes', sql.VarChar, adjustment.Notes || null)
                .query(`
                    INSERT INTO StockCheckAdjustment (StockCheckLineID, AdjustmentQuantity, EmployeeID, Notes)
                    OUTPUT INSERTED.*
                    VALUES (@StockCheckLineID, @AdjustmentQuantity, @EmployeeID, @Notes)
                `);
            return result.recordset[0];
        },

        getByLine: async (lineId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('lineId', sql.Int, lineId)
                .query('SELECT * FROM StockCheckAdjustment WHERE StockCheckLineID = @lineId');
            return result.recordset;
        }
    };
    return StockCheckAdjustment;
};
