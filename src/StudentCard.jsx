// src/StudentCard.jsx
import React from 'react';

const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="student-card">
      <div>
        <strong>Roll No:</strong> {student.rollNo}
      </div>
      <div>
        <strong>Name:</strong> {student.name}
      </div>
      <div>
        <strong>Age:</strong> {student.age}
      </div>
      <div>
        <strong>Class:</strong> {student.className}
      </div>
      <div>
        <button onClick={() => onEdit(student)}>Edit</button>
        <button onClick={() => onDelete(student.rollNo)}>Delete</button>
      </div>
    </div>
  );
};

export default StudentCard;
