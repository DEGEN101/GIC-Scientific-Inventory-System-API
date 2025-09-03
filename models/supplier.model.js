module.exports = (sql, poolPromise) => {
    const Supplier = {
        create: async (supplier) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Name', sql.VarChar, supplier.Name)
                .input('ContactName', sql.VarChar, supplier.ContactName)
                .input('Email', sql.VarChar, supplier.Email)
                .input('Phone', sql.VarChar, supplier.Phone)
                .input('BillingAddress', sql.VarChar, supplier.BillingAddress)
                .input('Status', sql.VarChar, supplier.Status)
                .query(`INSERT INTO Supplier 
                        (Name, ContactName, Email, Phone, BillingAddress, Status) 
                        OUTPUT INSERTED.* 
                        VALUES (@Name, @ContactName, @Email, @Phone, @BillingAddress, @Status)`
                );

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
                .input('ContactName', sql.VarChar, supplier.ContactName)
                .input('Email', sql.VarChar, supplier.Email)
                .input('Phone', sql.VarChar, supplier.Phone)
                .input('BillingAddress', sql.VarChar, supplier.BillingAddress)
                .input('Status', sql.VarChar, supplier.Status)
                .query(`UPDATE Supplier SET 
                        Name = @Name, ContactName = @ContactName, Email = @Email, Phone = @Phone, @BillingAddress = BillingAddress, @Status = Status 
                        WHERE SupplierID = @id`);

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
