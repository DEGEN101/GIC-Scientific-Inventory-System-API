module.exports = (sql, poolPromise) => {
    const Supplier = {
        create: async (supplier) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Name', sql.VarChar, supplier.Name)
                .input('Email', sql.VarChar, supplier.Email)
                .input('PhoneNumber', sql.NChar, supplier.PhoneNumber)
                .query('INSERT INTO Supplier (Name, Email, PhoneNumber) OUTPUT INSERTED.* VALUES (@Name, @Email, @PhoneNumber)');

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM Supplier');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Supplier WHERE SupplierID = @id');

            return result.recordset[0];
        },

        updateById: async (id, supplier) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('Name', sql.VarChar, supplier.Name)
                .input('Email', sql.VarChar, supplier.Email)
                .input('PhoneNumber', sql.NChar, supplier.PhoneNumber)
                .query('UPDATE Supplier SET Name = @Name, Email = @Email, PhoneNumber = @PhoneNumber WHERE SupplierID = @id');

            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM Supplier WHERE SupplierID = @id');

            return result.rowsAffected[0];
        }
    };

    return Supplier;
};
