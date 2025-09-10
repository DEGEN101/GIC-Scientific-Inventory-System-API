module.exports = (sql, poolPromise) => {
    const StockMovement = {
        create: async (movement) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('FromInventoryID', sql.Int, movement.FromInventoryID || null)
                .input('ToInventoryID', sql.Int, movement.ToInventoryID || null)
                .input('Quantity', sql.Decimal(10,2), movement.Quantity)
                .input('MovementType', sql.VarChar, movement.MovementType)
                .input('EmployeeID', sql.Int, movement.EmployeeID)
                .input('ReferenceID', sql.Int, movement.ReferenceID || null)
                .input('Notes', sql.VarChar, movement.Notes || null)
                .query(`
                    INSERT INTO StockMovement (FromInventoryID, ToInventoryID, Quantity, MovementType, EmployeeID, ReferenceID, Notes)
                    OUTPUT INSERTED.*
                    VALUES (@FromInventoryID, @ToInventoryID, @Quantity, @MovementType, @EmployeeID, @ReferenceID, @Notes)
                `);
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query('SELECT * FROM StockMovement ORDER BY MovementDate DESC');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM StockMovement WHERE MovementID = @id');
            return result.recordset[0];
        }
    };
    return StockMovement;
};
