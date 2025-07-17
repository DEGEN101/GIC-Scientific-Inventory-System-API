module.exports = (sql, poolPromise) => {
    const StockItemCategory = {
        create: async (category) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Name', sql.VarChar, category.Name)
                .input('Description', sql.Text, category.Description)
                .query('INSERT INTO StockItemCategory (Name, Description) OUTPUT INSERTED.* VALUES (@Name, @Description)');

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM StockItemCategory');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM StockItemCategory WHERE StockItemCategoryID = @id');
            return result.recordset[0];
        },

        updateById: async (id, category) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('Name', sql.VarChar, category.Name)
                .input('Description', sql.Text, category.Description)
                .query('UPDATE StockItemCategory SET Name = @Name, Description = @Description WHERE StockItemCategoryID = @id');
            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM StockItemCategory WHERE StockItemCategoryID = @id');
            return result.rowsAffected[0];
        }
    };

    return StockItemCategory;
};
