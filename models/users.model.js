    module.exports = (sql, poolPromise) => {
    const User = {
        create: async (newUser) => {
            const pool = await poolPromise;
            
            const result = await pool.request()
            .input('EmployeeID', sql.Int, newEmployee.EmployeeID)
            .input('Username', sql.VarChar, newEmployee.Username)
            .input('PasswordHash', sql.VarChar, newEmployee.PasswordHash)
            .query('INSERT INTO Users (EmployeeID, Username, PasswordHash) OUTPUT INSERTED.* VALUES (@EmployeeID, @Username, @PasswordHash)');
            
            return result.recordset[0];
        },
    
        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
            .query('SELECT * FROM Users');
            
            return result.recordset;
        },
    
        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Users WHERE UserID = @id');
            
            return result.recordset[0];
        },
    
        updateById: async (id, user) => {
            const pool = await poolPromise;

            const result = await pool.request()
            .input('EmployeeID', sql.Int, user.EmployeeID)
            .input('Username', sql.VarChar, user.Username)
            .input('PasswordHash', sql.VarChar, user.PasswordHash)
            .query('UPDATE Users SET EmployeeID = @EmployeeID, Username = @Username, PasswordHash = @PasswordHash WHERE UserID = @id');
            
            return result.rowsAffected[0];
        },
    
        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Users WHERE UserID = @id');
            
            return result.rowsAffected[0];
        }
    };
      
    return User;
}