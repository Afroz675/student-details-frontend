

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";   // Important

 const API = "https://student-details-backend-4.onrender.com";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // READ
  const fetchStudents = async () => {
    const res = await axios.get(`${API}/students`);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // CREATE
  const addStudent = async () => {
    await axios.post(`${API}/students`, { name, age });
    fetchStudents();
  };

  // DELETE
  const deleteStudent = async (id) => {
    await axios.delete(`${API}/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="container">
      <h1>Student CRUD App</h1>

      <div className="input-group">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <button onClick={addStudent}>Add</button>
      </div>

      {students.map((s) => (
        <div className="student-item" key={s.id}>
          <span>{s.name} - {s.age}</span>
          <button className="delete-btn" onClick={() => deleteStudent(s.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;