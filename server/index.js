require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const port = 'https://myproject-usd4.onrender.com';
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log("MongoDB connection failed:", error);
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
app.get('/api/employees', async(req, res) => {
    try {

        const employees = await Employee.find();
        res.json(employees);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/employees/:id', async(req, res) => {
    try {

        const employees = await Employee.findById(req.params.id);
        if (!employees)
            return res.status(404).json({ massage: 'employee not found' });
        res.json(employees);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete('/api/employees/:id', async(req, res) => {
    try {

        const employees = await Employee.findByIdAndDelete(req.params.id);
        if (!employees)
            return res.status(404).json({ massage: 'employee not found' });
        res.json(employees);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update employee by ID
app.put('/api/employees/:id', async(req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true, //Update ke baad updated document return kare.
                runValidators: true //Schema ke validation rules ko enforce kare 
                    //update ke waqt bhi
            });
        if (!updatedEmployee)
            return res.status(404).json({ message: 'Employee not found' });
        //res.json(updatedEmployee);
        res.json({ message: 'Employee Updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen({ port }, () => { console.log(`server started on http://localhost:${port}`) })
