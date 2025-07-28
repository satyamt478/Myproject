import axios from "axios";
import { useState } from "react";
import './Deletefile.css';

export function Delete() {
    const [id, setId] = useState("");

    async function deleteData(e) {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3001/api/employees/${id}`);
            alert(response.data.message || "Record deleted successfully!");
        } catch (err) {
            alert("Record Not Found or Error Occurred: " + err.message);
        }
    }

    return (
        <div className="container-delete">
            <h3>Delete Record By ID</h3>
            <hr />
            <form onSubmit={deleteData}>
                <input 
                    type="text" 
                    placeholder="Enter ID" 
                    value={id} 
                    onChange={e => setId(e.target.value)} 
                    required 
                />
                <br /><br />
                <button type="submit">Remove Data</button>
            </form>
        </div>
    );
}
