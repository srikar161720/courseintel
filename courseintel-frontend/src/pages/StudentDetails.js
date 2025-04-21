import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data on mount
  useEffect(() => {
    axios.get(`http://localhost:8000/api/students/${id}/`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Student not found');
        setLoading(false);
      });
  }, [id]);

  // Delete student
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    axios.delete(`http://localhost:8000/api/students/${id}/`)
      .then(() => navigate('/students'))
      .catch(() => setError('Failed to delete student'));
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!student) return null;

  return (
    <Container className="py-5">
      <Link to="/students" style={{ textDecoration: 'none', color: 'black' }}>
        ← Students
      </Link>
      <h2 className="fw-bold mb-4">Student Details</h2>
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
        <Col sm={3}><strong>E-mail:</strong></Col>
        <Col>{student.email}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Start Date:</strong></Col>
        <Col>{student.start_date}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Program:</strong></Col>
        <Col>{student.program}</Col>
      </Row>
      <Row className="mb-4">
        <Col sm={3}><strong>GPA:</strong></Col>
        <Col>{student.gpa}</Col>
      </Row>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary" onClick={() => navigate(`/students/${id}/update`)}>
          Update Student
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Student
        </Button>
      </div>
    </Container>
  );
}

export default StudentDetails;
