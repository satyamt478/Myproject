require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // ✅ Declare app FIRST

app.use(express.json());
app.use(cors());

// ✅ Listen only after everything is set up
const port = 'https://myproject-usd4.onrender.com';

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.log("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
}

connectDB();

const employeeSchema = new mongoose.Schema({
    empNo: { type: Number, required: true },
    empName: { type: String, required: true, unique: true },
    empSal: { type: Number, required: true },
}, {
    timestamps: false,
    versionKey: false
});

const Employee = mongoose.model('Employee', employeeSchema);

// Add Employee
app.post('/api/employees', async(req, res) => {
    try {
        const { employeeNo, employeeName, employeeSalary } = req.body;
        const employee = new Employee({
            empNo: employeeNo,
            empName: employeeName,
            empSal: employeeSalary
        });

        await employee.save();
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Employees
app.get('/api/employees', async(req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Employee by ID
app.get('/api/employees/:id', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee)
            return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Employee
app.delete('/api/employees/:id', async(req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee)
            return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Employee
app.put('/api/employees/:id', async(req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true
            }
        );
        if (!updatedEmployee)
            return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ Start the server
app.listen({port}, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`);
});
