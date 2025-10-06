module.exports = (sql, poolPromise) => {
    const BillOfMaterials = {
        create: async (bom) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('ProductID', sql.Int, bom.ProductID)
                .input('RawMaterialID', sql.Int, bom.RawMaterialID)
                .input('QuantityRequired', sql.Decimal(10,2), bom.QuantityRequired)
                .input('UoMID', sql.Int, bom.UoMID)
                .query(`
                    INSERT INTO BillOfMaterials (ProductID, RawMaterialID, QuantityRequired, UoMID)
                    OUTPUT INSERTED.*
                    VALUES (@ProductID, @RawMaterialID, @QuantityRequired, @UoMID)
                `);
            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM BillOfMaterials');
            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM BillOfMaterials WHERE BOMID = @id');
            return result.recordset[0];
        },

        findByProductID: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM BillOfMaterials WHERE ProductID = @id');
            return result.recordset[0];
        },

        updateById: async (id, bom) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('ProductID', sql.Int, bom.ProductID)
                .input('RawMaterialID', sql.Int, bom.RawMaterialID)
                .input('QuantityRequired', sql.Decimal(10,2), bom.QuantityRequired)
                .input('UoMID', sql.Int, bom.UoMID)
                .query(`
                    UPDATE BillOfMaterials
                    SET ProductID = @ProductID,
                        RawMaterialID = @RawMaterialID,
                        QuantityRequired = @QuantityRequired,
                        UoMID = @UoMID
                    WHERE BOMID = @id
                `);
            return result.rowsAffected[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM BillOfMaterials WHERE BOMID = @id');
            return result.rowsAffected[0];
        }
    };

    return BillOfMaterials;
};
