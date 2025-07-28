import { useState } from "react";
import axios from "axios";
import "./Findbyid.css";


export function FindById() {
    const [id, setID] = useState("");
    const [Employees, setEmployees] = useState(null);

    async function A(e) {
        e.preventDefault();

        try {
            const response = await axios.get(`https://satyam-employee.onrender.com/api/employees/${id}`);
            setEmployees(response.data); 
        } catch (err) {
            setEmployees(null);
            alert("Employee not found or error occurred");
        }
    }

    return (
        <div>
            <h3>Find Record By ID</h3>
            <hr />

            <input
                type="text"
                placeholder="Enter Id"
                value={id}
                onChange={e => setID(e.target.value)}
                required
            />
            <br /><br />
            <button onClick={A}>Find Data</button>
            <br />
            {Employees && (
                <div>
                    <h4>Employee Details</h4>
                    <hr />
                    <p>Emp No is : {Employees.empNo}</p>
                    <p>Emp Name is : {Employees.empName}</p>
                    <p>Emp Sal is : {Employees.empSal}</p>
                </div>
            )}
        </div>
    );
}
