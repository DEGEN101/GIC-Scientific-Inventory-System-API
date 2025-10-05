module.exports = (sql, poolPromise) => {
    const ProductionOrder = {
        create: async (order) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('QuantityToProduce', sql.Decimal(18,2), order.QuantityToProduce)
                .input('ProductionDate', sql.DateTime, order.ProductionDate)
                .input('Status', sql.VarChar, order.Status)
                .input('ProducedBy', sql.Int, order.ProducedBy)
                .input('Notes', sql.Text, order.Notes)
                .input('InvoiceNumber', sql.VarChar, order.InvoiceNumber)
                .query(`
                    INSERT INTO ProductionOrder 
                    (QuantityToProduce, ProductionDate, Status, ProducedBy, Notes, InvoiceNumber)
                    OUTPUT INSERTED.*
                    VALUES (@QuantityToProduce, @ProductionDate, @Status, @ProducedBy, @Notes, @InvoiceNumber)
                `);
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM ProductionOrder');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM ProductionOrder WHERE ProductionOrderID = @id');
            return result.recordset[0];
        },

        updateById: async (id, order) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('QuantityToProduce', sql.Decimal(18,2), order.QuantityToProduce)
                .input('ProductionDate', sql.DateTime, order.ProductionDate)
                .input('Status', sql.VarChar, order.Status)
                .input('ProducedBy', sql.Int, order.ProducedBy)
                .input('Notes', sql.Text, order.Notes)
                .input('InvoiceNumber', sql.VarChar, order.InvoiceNumber)
                .query(`
                    UPDATE ProductionOrder
                    SET QuantityToProduce = @QuantityToProduce,
                        ProductionDate = @ProductionDate,
                        Status = @Status,
                        ProducedBy = @ProducedBy,
                        Notes = @Notes,
                        InvoiceNumber = @InvoiceNumber
                    WHERE ProductionOrderID = @id
                `);
            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM ProductionOrder WHERE ProductionOrderID = @id');
            return result.rowsAffected[0];
        }
    };

    return ProductionOrder;
};
