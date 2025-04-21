import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CourseTable({ courses }) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Course ID</th>
          <th>Title</th>
          <th>Department</th>
          <th>Course #</th>
          <th>Credits</th>
        </tr>
      </thead>
      <tbody>
        {courses.length > 0 ? (
          courses.map((course) => (
            <tr
              key={course.course_id}
              onClick={() => handleRowClick(course.course_id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{course.course_id}</td>
              <td>{course.title}</td>
              <td>{course.department}</td>
              <td>{course.course_num}</td>
              <td>{course.credits}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">No courses found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default CourseTable;
