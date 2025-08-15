module.exports = (sql, poolPromise) => {
    const Location = {
        create: async (location) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("Name", sql.VarChar, location.Name)
                .input("Description", sql.VarChar, location.Description)
                .input("StorageTypeID", sql.Int, location.StorageTypeID)
                .query("INSERT INTO Location (Name, Description, StorageTypeID) OUTPUT INSERTED.* VALUES (@Name, @Description, @StorageTypeID)");

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query("SELECT * FROM Location");

            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM Location WHERE LocationID = @id");

            return result.recordset[0];
        },

        updateById: async (id, updatedLocation) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("Name", sql.VarChar, updatedLocation.Name)
                .input("Description", sql.VarChar, updatedLocation.Description)
                .input("StorageTypeID", sql.Int, updatedLocation.StorageTypeID)
                .query("UPDATE Location SET Name = @Name, Description = @Description, StorageTypeID = @StorageTypeID WHERE LocationID = @id");

            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM Location WHERE LocationID = @id");
                
            return result.rowsAffected[0];
        }
    };

    return Location;
};
