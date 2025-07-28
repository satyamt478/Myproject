import axios from "axios";
import { useState } from "react";
import "./Update.css";

export function Update() {
  const [id, setId] = useState("");
  const [empNo, setNo] = useState("");
  const [empName, setName] = useState("");
  const [empSal, setSal] = useState("");

  async function updateHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://satyam-employee.onrender.com/api/employees/${id}`,
        {
          empNo: Number(empNo),
          empName,
          empSal: Number(empSal),
        }
      );
      alert(response.data.message);
    } catch (err) {
      alert("Error updating record: " + err.message);
    }
  }

  return (
    <div className="container-update">
      <h2>Update Record</h2>
      <form onSubmit={updateHandler}>
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Emp No"
          value={empNo}
          onChange={(e) => setNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Name"
          value={empName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Salary"
          value={empSal}
          onChange={(e) => setSal(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
