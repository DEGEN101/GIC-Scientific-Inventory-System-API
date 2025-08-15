module.exports = (sql, poolPromise) => {
    const Shelf = {
        create: async (newShelf) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("LocationID", sql.VarChar, newShelf.LocationID)
                .input("Name", sql.VarChar, newShelf.ShelfName)
                .input("ShelfRow", sql.VarChar, newShelf.ShelfRow)
                .input("ShelfColumn", sql.VarChar, newShelf.ShelfColumn)
                .query("INSERT INTO Shelf (LocationID, ShelfName, ShelfRow, ShelfColumn) OUTPUT INSERTED.* VALUES (@LocationID, @Name, @ShelfRow, @ShelfColumn)");

            return result.recordset[0];
        },

        findByLocationId: async (LocationID) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("LocationID", sql.Int, LocationID)
                .query("SELECT * FROM Shelf WHERE LocationID = @LocationID");

            return result.recordset;
        },


        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query("SELECT * FROM Shelf");

            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM Shelf WHERE ShelfID = @id");

            return result.recordset[0];
        },

        updateById: async (id, updatedShelf) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("LocationID", sql.VarChar, updatedShelf.LocationID)
                .input("Name", sql.VarChar, updatedShelf.ShelfName)
                .input("ShelfRow", sql.VarChar, updatedShelf.ShelfRow)
                .input("ShelfColumn", sql.VarChar, updatedShelf.ShelfColumn)
                .query("UPDATE Shelf SET LocationID = @LocationID, ShelfName = @Name, ShelfRow = @ShelfRow, ShelfColumn = @ShelfColumn WHERE ShelfID = @id");

            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM Shelf WHERE ShelfID = @id");
                
            return result.rowsAffected[0];
        }
    };

    return Shelf;
};