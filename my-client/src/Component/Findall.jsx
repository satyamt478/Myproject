import { useState } from "react";
import "./Findall.css";
import axios from "axios";

export function FindAll() {
    const [Employees, setEmployees] = useState([]);
    async function findAll(e) {
        e.preventDefault();


        try {

            const response = await axios.get("https://satyam-employee.onrender.com/api/employees");
            setEmployees(response.data);
            //alert("Employees fetched successfully!");


        } catch (err) {
            alert(err);
        }
    }

    return (

        <div>
             <form onSubmit={findAll}>
                <button type="submit">find</button>
            
        </form>

       
        <div className="employee-table">
            <table>
                <thead>
                    <tr>
                        <th>Employee No</th>
                        <th>Employee Name</th>
                        <th>Employee Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {Employees.map((Employee) => (
                        <tr key={Employee._id}>
                            <td>{Employee.empNo}</td>
                            <td>{Employee.empName}</td>
                            <td>{Employee.empSal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}
