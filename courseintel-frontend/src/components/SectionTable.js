import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SectionTable({ sections }) {
  const navigate = useNavigate();

  const handleRowClick = (sectionId) => {
    navigate(`/course-sections/${sectionId}`);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Section ID</th>
          <th>Instructor ID</th>
          <th>Semester</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {sections.length > 0 ? (
          sections.map((section) => (
            <tr
              key={section.section_id}
              onClick={() => handleRowClick(section.section_id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{section.section_id}</td>
              <td>{section.instructor}</td>
              <td>{section.semester}</td>
              <td>{section.year}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No course sections found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default SectionTable;
