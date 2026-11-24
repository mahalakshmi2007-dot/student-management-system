
import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "", email: "", course: "", phone: ""
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() ||
        !form.course || !form.phone.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Enter a valid email");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    if (editId) {
      setStudents(students.map((s) =>
        s.id === editId ? { ...form, id: editId } : s
      ));
      setEditId(null);
    } else {
      setStudents([...students, { ...form, id: Date.now() }]);
    }

    setForm({ name: "", email: "", course: "", phone: "" });
  };

  const editStudent = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
      phone: student.phone
    });
    setEditId(student.id);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const filtered = students.filter((s) =>
    `${s.name} ${s.email} ${s.course}`.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="container">
      <header>
        <h1>🎓 Student Management</h1>
        <p>Student Registration & Management System</p>
      </header>

      <section className="card">
        <h2>{editId ? "Edit Student" : "Register New Student"}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="10-digit Phone Number" value={form.phone} onChange={handleChange} required />
          <select name="course" value={form.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            <option>Artificial Intelligence</option>
            <option>Computer Science</option>
            <option>Information Technology</option>
            <option>Electronics</option>
            <option>Data Science</option>
          </select>
          <button type="submit">{editId ? "Update Student" : "Register Student"}</button>
        </form>
      </section>

      <section className="card">
        <div className="list-header">
          <h2>Student Records ({students.length})</h2>
          <input placeholder="🔍 Search students..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <p className="empty">No students found. Register your first student!</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Course</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td>{s.course}</td>
                    <td>
                      <button className="edit" onClick={() => editStudent(s)}>Edit</button>
                      <button className="delete" onClick={() => deleteStudent(s.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <footer>Built with React.js | Student Management App</footer>
    </main>
  );
}

export default App;
