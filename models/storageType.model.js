module.exports = (sql, poolPromise) => {
    const StorageType = {
        create: async (newStorageType) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("TypeName", sql.VarChar, newStorageType.Name)
                .query("INSERT INTO StorageType (TypeName) OUTPUT INSERTED.* VALUES (@TypeName)");

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query("SELECT * FROM StorageType");

            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM StorageType WHERE StorageTypeID = @id");

            return result.recordset[0];
        },

        updateById: async (id, updatedStorageType) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("TypeName", sql.VarChar, updatedStorageType.TypeName)
                .query("UPDATE StorageType SET Name = @TypeName WHERE StorageTypeID = @id");

            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM Location WHERE StorageTypeID = @id");
                
            return result.rowsAffected[0];
        }
    };

    return StorageType;
};
