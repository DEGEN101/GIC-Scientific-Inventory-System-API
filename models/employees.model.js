module.exports = (sql, poolPromise) => {
    const Employee = {
        create: async (newEmployee) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('FirstName', sql.VarChar, newEmployee.FirstName)
            .input('Surname', sql.VarChar, newEmployee.Surname)
            .input('Role', sql.VarChar, newEmployee.Role)
            .input('Email', sql.VarChar, newEmployee.Email)
            .input('PhoneNumber', sql.NChar, newEmployee.PhoneNumber)
            .query('INSERT INTO Employees (FirstName, Surname, Role, Email, PhoneNumber) OUTPUT INSERTED.* VALUES (@FirstName, @Surname, @Role, @Email, @PhoneNumber)');
            
            return result.recordset[0];
        },
    
        getAll: async () => {
            const pool = await poolPromise;
            const result = await pool.request()
            .query('SELECT * FROM Employees');
            
            return result.recordset;
        },
    
        findById: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Employees WHERE EmployeeID = @id');
            
            return result.recordset[0];
        },
    
        updateById: async (id, employee) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('id', sql.Int, id)
            .input('FirstName', sql.VarChar, employee.FirstName)
            .input('Surname', sql.VarChar, employee.Surname)
            .input('Role', sql.VarChar, employee.Role)
            .input('Email', sql.VarChar, employee.Email)
            .input('PhoneNumber', sql.NChar, employee.PhoneNumber)
            .query('UPDATE Employees SET FirstName = @FirstName, Surname = @Surname, Role = @Role, Email = @Email, PhoneNumber = @PhoneNumber WHERE EmployeeID = @id');
            
            return result.rowsAffected[0];
        },
    
        remove: async (id) => {
            const pool = await poolPromise;
            const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Employees WHERE EmployeeID = @id');
            
            return result.rowsAffected[0];
        }
    };
      
    return Employee;
}