import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function EnrollmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch enrollment data on mount
  useEffect(() => {
    axios.get(`http://localhost:8000/api/enrollments/${id}/`)
      .then((res) => {
        setEnrollment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Enrollment not found');
        setLoading(false);
      });
  }, [id]);

  // Delete enrollment
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this enrollment?');
    if (!confirmed) return;

    axios.delete(`http://localhost:8000/api/enrollments/${id}/`)
      .then(() => navigate('/enrollments'))
      .catch(() => setError('Failed to delete enrollment'));
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!enrollment) return null;

  return (
    <Container className="py-5">
      <Link to="/enrollments" style={{ textDecoration: 'none', color: 'black' }}>
        ← Enrollments
      </Link>
      <h2 className="fw-bold mb-4">Enrollment Details</h2>

      <Row className="mb-2">
        <Col sm={3}><strong>Enrollment ID:</strong></Col>
        <Col>{enrollment.enrollment_id}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Student ID:</strong></Col>
        <Col>{enrollment.student}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Section ID:</strong></Col>
        <Col>{enrollment.course_section}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Status:</strong></Col>
        <Col>{enrollment.status}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Grade:</strong></Col>
        <Col>{enrollment.grade || '—'}</Col>
      </Row>
      <Row className="mb-4">
        <Col sm={3}><strong>Enrollment Date:</strong></Col>
        <Col>{enrollment.enrollment_date}</Col>
      </Row>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary" onClick={() => navigate(`/enrollments/${id}/update`)}>
          Update Enrollment
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Enrollment
        </Button>
      </div>
    </Container>
  );
}

export default EnrollmentDetails;
