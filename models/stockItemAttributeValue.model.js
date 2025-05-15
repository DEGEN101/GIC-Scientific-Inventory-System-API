module.exports = (sql, poolPromise) => {
    const StockItemAttributeValue = {
        create: async (value) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemID', sql.Int, value.StockItemID)
                .input('AttributeID', sql.Int, value.AttributeID)
                .input('AttributeValue', sql.VarChar, value.AttributeValue)
                .query('INSERT INTO StockItemAttributeValue (StockItemID, AttributeID, AttributeValue) \
                    OUTPUT INSERTED.* VALUES (@StockItemID, @AttributeID, @AttributeValue)');

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM StockItemAttributeValue');
            return result.recordset;
        },

        findByKey: async (stockItemId, attributeId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemID', sql.Int, stockItemId)
                .input('AttributeID', sql.Int, attributeId)
                .query('SELECT * FROM StockItemAttributeValue WHERE StockItemID = @StockItemID AND \
                    AttributeID = @AttributeID');

            return result.recordset[0];
        },

        updateByKey: async (stockItemId, attributeId, newValue) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemID', sql.Int, stockItemId)
                .input('AttributeID', sql.Int, attributeId)
                .input('AttributeValue', sql.VarChar, newValue)
                .query('UPDATE StockItemAttributeValue SET AttributeValue = @AttributeValue WHERE \
                    StockItemID = @StockItemID AND AttributeID = @AttributeID');

            return result.rowsAffected[0];
        },

        remove: async (stockItemId, attributeId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemID', sql.Int, stockItemId)
                .input('AttributeID', sql.Int, attributeId)
                .query('DELETE FROM StockItemAttributeValue WHERE StockItemID = @StockItemID AND \
                    AttributeID = @AttributeID');

            return result.rowsAffected[0];
        }
    };

    return StockItemAttributeValue;
};
