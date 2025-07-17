module.exports = (sql, poolPromise) => {
    const PurchaseOrder = {
        create: async (po) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("SupplierID", sql.Int, po.SupplierID)
                .input("OrderDate", sql.Date, po.OrderDate)
                .input("Status", sql.VarChar, po.Status)
                .query("INSERT INTO PurchaseOrder (SupplierID, OrderDate, Status) OUTPUT INSERTED.* \
                    VALUES (@SupplierID, @OrderDate, @Status)");
            
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query("SELECT * FROM PurchaseOrder");
            
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM PurchaseOrder WHERE POID = @id");
            
            return result.recordset[0];
        },

        updateById: async (id, po) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .input("SupplierID", sql.Int, po.SupplierID)
                .input("OrderDate", sql.Date, po.OrderDate)
                .input("Status", sql.VarChar, po.Status)
                .query("UPDATE PurchaseOrder SET SupplierID = @SupplierID, OrderDate = @OrderDate, Status = @Status \
                    WHERE POID = @id");
            
            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM PurchaseOrder WHERE POID = @id");

            return result.rowsAffected[0];
        }
    };

    return PurchaseOrder;
};
