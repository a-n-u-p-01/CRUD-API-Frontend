// src/App.jsx
import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent, getStudents, deleteStudent } from './StudentService';
import StudentCard from './StudentCard'; // Import StudentCard component
import './App.css'; // Import CSS file

function App() {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({ rollNo: '', name: '', age: '', className: '' }); // Make sure it matches your Student object
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        fetchStudents();
        const interval = setInterval(fetchStudents, 5000); // Polling every 5 seconds
        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            console.log("Fetched students:", data); // Log fetched data
            setStudents(data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleCreateOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (isUpdate) {
                await updateStudent(student);
                console.log("Student updated:", student); // Log updated student
            } else {
                await createStudent(student);
                console.log("Student created:", student); // Log created student
            }
            fetchStudents(); // Fetch the updated list
            setStudent({ rollNo: '', name: '', age: '', className: '' }); // Reset form
            setIsUpdate(false);
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    const handleDelete = async (rollNo) => {
        try {
            await deleteStudent(rollNo);
            console.log("Deleted student:", rollNo); // Log deleted student
            fetchStudents(); // Fetch the updated list
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEdit = (student) => {
        setStudent(student);
        setIsUpdate(true);
    };

    return (
        <div className="container">
            <h1>Student Management</h1>
            <form onSubmit={handleCreateOrUpdate}>
                <input
                    type="text"
                    name="rollNo"
                    value={student.rollNo}
                    onChange={handleChange}
                    placeholder="Roll No"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="number"
                    name="age"
                    value={student.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                />
                <input
                    type="text"
                    name="className" // Make sure this matches your Student object
                    value={student.className} // Make sure this matches your Student object
                    onChange={handleChange}
                    placeholder="Class"
                    required
                />
                <button type="submit">{isUpdate ? "Update" : "Add"}</button>
            </form>
            <div className="student-list">
                {students.map(s => (
                    <StudentCard
                        key={s.rollNo}
                        student={s}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
