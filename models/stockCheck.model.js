module.exports = (sql, poolPromise) => {
    const StockCheck = {
        create: async (newCheck) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('LocationID', sql.Int, newCheck.LocationID)
                .input('EmployeeID', sql.Int, newCheck.EmployeeID)
                .query(`
                    INSERT INTO StockCheck (LocationID, EmployeeID)
                    OUTPUT INSERTED.*
                    VALUES (@LocationID, @EmployeeID)
                `);
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query('SELECT * FROM StockCheck');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM StockCheck WHERE StockCheckID = @id');
            return result.recordset[0];
        },

        updateStatus: async (id, statusUpdate) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('Status', sql.VarChar, statusUpdate.status)
                .input('EndDate', sql.DateTime, statusUpdate.endDate || null)
                .query(`
                    UPDATE StockCheck 
                    SET Status = @Status, EndDate = @EndDate 
                    WHERE StockCheckID = @id
                `);
            return result.rowsAffected[0];
        }
    };
    return StockCheck;
};
