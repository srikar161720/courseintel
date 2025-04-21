import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Table } from 'react-bootstrap';
import axios from 'axios';

function AtRiskStudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [gpa, setGpa] = useState(null);
  const [atRisk, setAtRisk] = useState(false);
  const [droppedCourses, setDroppedCourses] = useState([]);
  const [failedCourses, setFailedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRowClick = (enrollmentId) => {
    navigate(`/enrollments/${enrollmentId}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/students/${id}/at-risk-details/`)
      .then((res) => {
        setStudent(res.data.student);
        setGpa(res.data.gpa);
        setAtRisk(res.data.at_risk);
        setDroppedCourses(res.data.dropped_courses);
        setFailedCourses(res.data.failed_courses);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load at-risk student details.');
        setLoading(false);
      });
  }, [id]);

  const renderCourseTable = (title, data) => (
    <>
      <h4 className="fw-bold mt-5">{title}</h4>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Enrollment ID</th>
            <th>Section ID</th>
            <th>Status</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((enrollment) => (
              <tr key={enrollment.enrollment_id} onClick={() => handleRowClick(enrollment.enrollment_id)} style={{ cursor: 'pointer' }}>
                <td>{enrollment.enrollment_id}</td>
                <td>{enrollment.section_id}</td>
                <td>{enrollment.status}</td>
                <td>{enrollment.grade || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No records found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!student) return null;

  return (
    <Container className="py-5">
      <Link to="/at-risk" style={{ textDecoration: 'none', color: 'black' }}>
        ← At-Risk Students
      </Link>

      <h2 className="fw-bold mb-4">At-Risk Student Details</h2>

      <Row className="mb-2">
        <Col sm={3}><strong>Student ID:</strong></Col>
        <Col>{student.student_id}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>First Name:</strong></Col>
        <Col>{student.first_name}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Last Name:</strong></Col>
        <Col>{student.last_name}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Program:</strong></Col>
        <Col>{student.program}</Col>
      </Row>
      <Row className="mb-4">
        <Col sm={3}><strong>GPA:</strong></Col>
        <Col>{gpa}</Col>
      </Row>

      <div className="d-flex justify-content-center mb-4">
        <div
          className={`px-4 py-2 text-white fw-bold rounded ${
            atRisk ? 'bg-danger' : 'bg-success'
          }`}
        >
          {atRisk ? 'At-Risk Student' : 'NOT At-Risk Student'}
        </div>
      </div>

      {renderCourseTable('Dropped Courses', droppedCourses)}
      {renderCourseTable('Failed Courses', failedCourses)}
    </Container>
  );
}

export default AtRiskStudentDetails;
