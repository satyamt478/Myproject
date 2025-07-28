import axios from "axios";
import { useState } from "react";
import "./Deletefile.css";

export function Delete() {
  const [id, setId] = useState("");

  async function deleteHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.delete(`https://satyam-employee.onrender.com/api/employees/${id}`);
      alert(response.data.message || "Deleted Successfully");
    } catch (err) {
      alert("Error deleting record: " + err.message);
    }
  }

  return (
    <div className="container-delete">
      <h3>Delete Record By ID</h3>
      <form onSubmit={deleteHandler}>
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
