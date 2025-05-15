module.exports = (sql, poolPromise) => {
    const StockItemAttribute = {
        create: async (attribute) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('StockItemCategoryID', sql.Int, attribute.StockItemCategoryID)
                .input('AttributeName', sql.VarChar, attribute.AttributeName)
                .query('INSERT INTO StockItemAttribute (StockItemCategoryID, AttributeName) OUTPUT INSERTED.* VALUES (@StockItemCategoryID, @AttributeName)');

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM StockItemAttribute');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM StockItemAttribute WHERE AttributeID = @id');

            return result.recordset[0];
        },

        updateById: async (id, attribute) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('StockItemCategoryID', sql.Int, attribute.StockItemCategoryID)
                .input('AttributeName', sql.VarChar, attribute.AttributeName)
                .query('UPDATE StockItemAttribute SET StockItemCategoryID = @StockItemCategoryID, AttributeName = @AttributeName WHERE AttributeID = @id');

            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM StockItemAttribute WHERE AttributeID = @id');

            return result.rowsAffected[0];
        }
    };

    return StockItemAttribute;
};
