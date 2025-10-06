module.exports = (sql, poolPromise) => {
    const ProductionConsumption = {
        create: async (consumption) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('ProductionOrderID', sql.Int, consumption.ProductionOrderID)
                .input('InventoryID', sql.Int, consumption.InventoryID)
                .input('QuantityUsed', sql.Decimal(18,2), consumption.QuantityUsed)
                .query(`
                    INSERT INTO ProductionConsumption (ProductionOrderID, InventoryID, QuantityUsed)
                    OUTPUT INSERTED.*
                    VALUES (@ProductionOrderID, @InventoryID, @QuantityUsed)
                `);
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM ProductionConsumption');
            return result.recordset;
        },

        findByOrderId: async (orderId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('orderId', sql.Int, orderId)
                .query('SELECT * FROM ProductionConsumption WHERE ProductionOrderID = @orderId');
            return result.recordset;
        },

        remove: async (orderId, inventoryId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('orderId', sql.Int, orderId)
                .input('inventoryId', sql.Int, inventoryId)
                .query('DELETE FROM ProductionConsumption WHERE ProductionOrderID = @orderId AND InventoryID = @inventoryId');
            return result.rowsAffected[0];
        }
    };

    return ProductionConsumption;
};
