module.exports = (sql, poolPromise) => {
    const UnitOfMeasurement = {
        create: async (uom) => {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("Name", sql.VarChar, uom.Name)
            .input("IsBaseUnit", sql.Bit, uom.IsBaseUnit ?? false)
            .query("INSERT INTO UnitOfMeasurement (Name, IsBaseUnit) OUTPUT INSERTED.* VALUES (@Name, @IsBaseUnit)");
        return result.recordset[0];
        },

        getAll: async () => {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM UnitOfMeasurement");
        return result.recordset;
        },

        findById: async (id) => {
        const pool = await poolPromise;
        const result = await pool.request().input("id", sql.Int, id).query("SELECT * FROM UnitOfMeasurement WHERE UoMID = @id");
        return result.recordset[0];
        },

        updateById: async (id, uom) => {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("Name", sql.VarChar, uom.Name)
            .input("IsBaseUnit", sql.Bit, uom.IsBaseUnit)
            .query("UPDATE UnitOfMeasurement SET Name = @Name, IsBaseUnit = @IsBaseUnit WHERE UoMID = @id");
        return result.rowsAffected[0];
        },

        remove: async (id) => {
        const pool = await poolPromise;
        const result = await pool.request().input("id", sql.Int, id).query("DELETE FROM UnitOfMeasurement WHERE UoMID = @id");
        return result.rowsAffected[0];
        }
    }

    return UnitOfMeasurement;
};
