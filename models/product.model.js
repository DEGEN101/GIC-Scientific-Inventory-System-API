module.exports = (sql, poolPromise) => {
    const Product = {
        create: async (product) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('ProductionOrderID', sql.Int, product.ProductionOrderID)
                .input('Name', sql.VarChar, product.Name)
                .input('BatchNumber', sql.VarChar, product.BatchNumber)
                .input('Quantity', sql.Decimal(18,2), product.Quantity)
                .input('Size', sql.VarChar, product.Size)
                .query(`
                    INSERT INTO Product (ProductionOrderID, Name, BatchNumber, Quantity, Size)
                    OUTPUT INSERTED.*
                    VALUES (@ProductionOrderID, @Name, @BatchNumber, @Quantity, @Size)
                `);
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM Product');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Product WHERE ProductID = @id');
            return result.recordset[0];
        },

        findByOrderId: async (orderId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('orderId', sql.Int, orderId)
                .query('SELECT * FROM Product WHERE ProductionOrderID = @orderId');
            return result.recordset;
        },

        updateById: async (id, product) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('ProductionOrderID', sql.Int, product.ProductionOrderID)
                .input('Name', sql.VarChar, product.Name)
                .input('BatchNumber', sql.VarChar, product.BatchNumber)
                .input('Quantity', sql.Decimal(18,2), product.Quantity)
                .input('Size', sql.VarChar, product.Size)
                .query(`
                    UPDATE Product
                    SET ProductionOrderID = @ProductionOrderID,
                        Name = @Name,
                        BatchNumber = @BatchNumber,
                        Quantity = @Quantity,
                        Size = @Size
                    WHERE ProductID = @id
                `);
            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM Product WHERE ProductID = @id');
            return result.rowsAffected[0];
        }
    };

    return Product;
};
