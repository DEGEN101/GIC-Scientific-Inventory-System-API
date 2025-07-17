module.exports = (sql, poolPromise) => {
    const StockItemGroup = {
        create: async (group) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('GroupID', sql.Int, group.GroupID)
                .input('Name', sql.VarChar, group.Name)
                .input('Description', sql.VarChar, group.Description)
                .query('INSERT INTO StockItemGroup (GroupID, Name, Description) OUTPUT INSERTED.* VALUES (@GroupID, @Name, @Description)');

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM StockItemGroup');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM StockItemGroup WHERE GroupID = @id');
            return result.recordset[0];
        },

        updateById: async (id, group) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('Name', sql.VarChar, group.Name)
                .input('Description', sql.VarChar, group.Description)
                .query('UPDATE StockItemGroup SET Name = @Name, Description = @Description WHERE GroupID = @id');
            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM StockItemGroup WHERE GroupID = @id');
            return result.rowsAffected[0];
        }
    };

    return StockItemGroup;
};
