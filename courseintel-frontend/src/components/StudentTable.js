import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function StudentTable({ students, basePath = '/students' }) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`${basePath}/${id}`);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Program</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <tr key={student.student_id} onClick={() => handleRowClick(student.student_id)} style={{ cursor: 'pointer' }}>
              <td>{student.student_id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.program}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No students found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default StudentTable;