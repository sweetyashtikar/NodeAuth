const Employee = require('../models/employee');

async function createEmployee(req, res) {
    try {
        const { name, email, password, occupation, salary, age } = req.body;
        const employee = new Employee({ name, email, password, occupation, salary, age });
        await employee.save();
        res.json(employee);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function getAllEmployees(req, res) {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getEmployeeById(req, res) {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.json(employee);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function updateEmployee(req, res) {
    try {
        const { name, email, password, occupation, salary, age } = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, { name, email, password, occupation, salary, age }, { new: true });
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.json(employee);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function deleteEmployee(req, res) {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};
