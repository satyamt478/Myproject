import axios from "axios";
import { useState } from "react";
import "./Findall.css";

export function FindAll() {
  const [employees, setEmployees] = useState([]);
  const [copiedId, setCopiedId] = useState("");

  async function findAll(e) {
    e.preventDefault();
    try {
      const response = await axios.get("https://satyam-employee.onrender.com/api/employees");
      setEmployees(response.data);
    } catch (err) {
      alert(err.message);
    }
  }

  function copyToClipboard(id) {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 1500);
  }

  return (
    <div>
      <form onSubmit={findAll}>
        <button type="submit">Find All</button>
      </form>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee No</th>
              <th>Employee Name</th>
              <th>Employee Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <span className="id-text">{emp._id}</span>
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(emp._id)}
                    title="Copy ID"
                  >
                    📋
                  </button>
                  {copiedId === emp._id && <span className="copied-msg">✅ Copied!</span>}
                </td>
                <td>{emp.empNo}</td>
                <td>{emp.empName}</td>
                <td>{emp.empSal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
