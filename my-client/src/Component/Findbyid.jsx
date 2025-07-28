import { useState } from "react";
import axios from "axios";
import "./Findbyid.css";

export function FindById() {
  const [id, setID] = useState("");
  const [employee, setEmployee] = useState(null);

  async function findById(e) {
    e.preventDefault();
    try {
      const response = await axios.get(`https://satyam-employee.onrender.com/api/employees/${id}`);
      setEmployee(response.data);
    } catch (err) {
      alert("Employee not found or error occurred.");
      setEmployee(null);
    }
  }

  return (
    <div>
      <h3>Find Record By ID</h3>
      <hr />
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setID(e.target.value)}
      />
      <button onClick={findById}>Find</button>
      {employee && (
        <div>
          <p><strong>ID:</strong> {employee._id}</p>
          <p>Emp No: {employee.empNo}</p>
          <p>Name: {employee.empName}</p>
          <p>Salary: {employee.empSal}</p>
        </div>
      )}
    </div>
  );
}
