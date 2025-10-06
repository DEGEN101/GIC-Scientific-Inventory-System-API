module.exports = (sql, poolPromise) => {
    const ProductionWaste = {
        create: async (waste) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('ProductionOrderID', sql.Int, waste.ProductionOrderID)
                .input('InventoryID', sql.Int, waste.InventoryID)
                .input('QuantityWasted', sql.Decimal(18,2), waste.QuantityWasted)
                .input('Reason', sql.Text, waste.Reason)
                .input('UoMID', sql.Int, waste.UoMID)
                .query(`
                    INSERT INTO ProductionWaste (ProductionOrderID, InventoryID, QuantityWasted, Reason, UoMID)
                    OUTPUT INSERTED.*
                    VALUES (@ProductionOrderID, @InventoryID, @QuantityWasted, @Reason, @UoMID)
                `);
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM ProductionWaste');
            return result.recordset;
        },

        findByOrderId: async (orderId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('orderId', sql.Int, orderId)
                .query('SELECT * FROM ProductionWaste WHERE ProductionOrderID = @orderId');
            return result.recordset;
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM ProductionWaste WHERE WasteLogID = @id');
            return result.rowsAffected[0];
        }
    };

    return ProductionWaste;
};
