import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function InstructorTable({ instructors }) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/instructors/${id}`);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Instructor ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {instructors.length > 0 ? (
          instructors.map((instructor) => (
            <tr key={instructor.instructor_id} onClick={() => handleRowClick(instructor.instructor_id)} style={{ cursor: 'pointer' }}>
              <td>{instructor.instructor_id}</td>
              <td>{instructor.first_name}</td>
              <td>{instructor.last_name}</td>
              <td>{instructor.department}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No instructors found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default InstructorTable;
