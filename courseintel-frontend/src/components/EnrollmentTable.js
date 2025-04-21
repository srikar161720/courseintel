import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EnrollmentTable({ enrollments }) {
  const navigate = useNavigate();

  const handleRowClick = (enrollmentId) => {
    navigate(`/enrollments/${enrollmentId}`);
  };

  return (
    <Table hover responsive bordered className="mt-4">
      <thead>
        <tr>
          <th>Enrollment ID</th>
          <th>Student ID</th>
          <th>Section ID</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {enrollments.length > 0 ? (
          enrollments.map((enrollment) => (
            <tr key={enrollment.enrollment_id} onClick={() => handleRowClick(enrollment.enrollment_id)} style={{ cursor: 'pointer' }}>
              <td>{enrollment.enrollment_id}</td>
              <td>{enrollment.student}</td>
              <td>{enrollment.section_id}</td>
              <td>{enrollment.status}</td>
              <td>{enrollment.enrollment_date}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No enrollments found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default EnrollmentTable;
