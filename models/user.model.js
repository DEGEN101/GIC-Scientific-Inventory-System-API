    const bcrypt = require('bcrypt');

    const constantsConfig = require("../config/constants.config");

    module.exports = (sql, poolPromise) => {
    const User = {
        create: async (newUser) => {
            const pool = await poolPromise;
            
            const hash = await bcrypt.hash(newUser.Password, constantsConfig.SALT_ROUNDS);

            const result = await pool.request()
            .input('EmployeeID', sql.Int, newUser.EmployeeID)
            .input('Username', sql.VarChar, newUser.Username)
            .input('PasswordHash', sql.VarChar, hash)
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

        findByUsername: async (username) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('Username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE Username = @Username');
            
            return result.recordset[0];
        },
    
        updateById: async (id, user) => {
            const pool = await poolPromise;
            
            const hash = await bcrypt.hash(user.Password, constantsConfig.SALT_ROUNDS);

            const result = await pool.request()
            .input('id', sql.Int, id)
            .input('EmployeeID', sql.Int, user.EmployeeID)
            .input('Username', sql.VarChar, user.Username)
            .input('PasswordHash', sql.VarChar, hash)
            .query('UPDATE Users SET EmployeeID = @EmployeeID, Username = @Username, PasswordHash = @PasswordHash WHERE UserID = @id');
            
            return result.rowsAffected[0];
        },
    
        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Users WHERE UserID = @id');
            
            return result.rowsAffected[0];
        },

        login: async (loginInfo) => {
            const user = await User.findByUsername(loginInfo.Username);
            if (!user) throw Error("[!] Incorrect username");

            const auth = await bcrypt.compare(loginInfo.Password, user.PasswordHash);
            if (!auth) throw Error("[!] Incorrect password");

            return user;
        }
    };
      
    return User;
}