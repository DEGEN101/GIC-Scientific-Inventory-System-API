const database = require("../models");
const Employee = database.employees;

module.exports = {
    create: async (req, res) => {
        try {
            const newEmployee = await Employee.create(req.body);
            res.status(201).json(newEmployee);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
          const employees = await Employee.getAll();
          res.status(200).json(employees);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    },

    findById: async (req, res) => {
        try {
          const employee = await Employee.findById(req.params.id);
          if (!employee) return res.status(404).json({ message: 'Employee not found' });
          res.status(200).json(employee);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
          const rowsAffected = await Employee.updateById(req.params.id, req.body);
          if (rowsAffected === 0) return res.status(404).json({ message: 'Employee not found' });
          res.status(200).json({ message: 'Employee updated successfully' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
          const rowsAffected = await Employee.remove(req.params.id);
          if (rowsAffected === 0) return res.status(404).json({ message: 'Employee not found' });
          res.status(200).json({ message: 'Employee deleted successfully' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    }      
}