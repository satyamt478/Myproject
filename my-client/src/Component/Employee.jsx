import { useState } from "react";
import "./Employee.css";
import axios from "axios";

export function Employee() {
  const [employeeNo, setEmployeeNo] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [message, setMessage] = useState("");

  async function addHandler(e) {
    e.preventDefault();
    if (!employeeNo || !employeeName || !employeeSalary) {
      setMessage("❗ Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("https://satyam-employee.onrender.com/api/employees", {
        employeeNo,
        employeeName,
        employeeSalary,
      });
      alert(response.data.message);
    } catch (err) {
     alert(err);
    }
  }

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={addHandler}>
        <h1 className="form-title">🧾 Employee Authentication</h1>

        <input
          type="text"
          placeholder="👨‍💼 Employee No"
          value={employeeNo}
          onChange={(e) => setEmployeeNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="🧑 Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <input
          type="number"
          placeholder="💰 Employee Salary"
          value={employeeSalary}
          onChange={(e) => setEmployeeSalary(e.target.value)}
        />

        <button type="submit">🚀 Add</button>

        

        {message && (
          <div className="message-card">
            <p>{message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
