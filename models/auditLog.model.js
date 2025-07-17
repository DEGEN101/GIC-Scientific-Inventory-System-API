module.exports = (sql, poolPromise) => {
    const AuditLog = {
        create: async (log) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("EmployeeID", sql.Int, log.EmployeeID)
                .input("Action", sql.VarChar, log.Action)
                .input("TableName", sql.VarChar, log.TableName)
                .input("RecordID", sql.VarChar, log.RecordID)
                .query("INSERT INTO AuditLog (EmployeeID, Action, TableName, RecordID) OUTPUT INSERTED.* \
                    VALUES (@EmployeeID, @Action, @TableName, @RecordID)");

            return result.recordset[0];
        },

        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
                .query("SELECT * FROM AuditLog");

            return result.recordset;
        },

        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT * FROM AuditLog WHERE LogID = @id");

            return result.recordset[0];
        },

        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("id", sql.Int, id)
                .query("DELETE FROM AuditLog WHERE LogID = @id");

            return result.rowsAffected[0];
        }
    };
    return AuditLog;
};
