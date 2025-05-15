module.exports = (sql, poolPromise) => {
    const UoM_Conversion = {
        create: async (conversion) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("FromUoMID", sql.Int, conversion.FromUoMID)
                .input("ToUoMID", sql.Int, conversion.ToUoMID)
                .input("ConversionFactor", sql.Decimal(10, 4), conversion.ConversionFactor)
                .query("INSERT INTO UoM_Conversion (FromUoMID, ToUoMID, ConversionFactor) OUTPUT INSERTED.* VALUES (@FromUoMID, @ToUoMID, @ConversionFactor)");

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query("SELECT * FROM UoM_Conversion");
                
            return result.recordset;
        },

        findByKey: async (fromId, toId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("fromId", sql.Int, fromId)
                .input("toId", sql.Int, toId)
                .query("SELECT * FROM UoM_Conversion WHERE FromUoMID = @fromId AND ToUoMID = @toId");

            return result.recordset[0];
        },

        updateByKey: async (fromId, toId, factor) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("fromId", sql.Int, fromId)
                .input("toId", sql.Int, toId)
                .input("ConversionFactor", sql.Decimal(10, 4), factor)
                .query("UPDATE UoM_Conversion SET ConversionFactor = @ConversionFactor WHERE FromUoMID = @fromId \
                    AND ToUoMID = @toId");

            return result.rowsAffected[0];
        },

        remove: async (fromId, toId) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("fromId", sql.Int, fromId)
                .input("toId", sql.Int, toId)
                .query("DELETE FROM UoM_Conversion WHERE FromUoMID = @fromId AND ToUoMID = @toId");

            return result.rowsAffected[0];
        }
    };
    return UoM_Conversion;
};