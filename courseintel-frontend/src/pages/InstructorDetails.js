import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function InstructorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch instructor data on mount
  useEffect(() => {
    axios.get(`http://localhost:8000/api/instructors/${id}/`)
      .then((res) => {
        setInstructor(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Instructor not found');
        setLoading(false);
      });
  }, [id]);

  // Delete instructor
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this instructor?');
    if (!confirmed) return;

    axios.delete(`http://localhost:8000/api/instructors/${id}/`)
      .then(() => navigate('/instructors'))
      .catch(() => setError('Failed to delete instructor'));
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!instructor) return null;

  return (
    <Container className="py-5">
      <Link to="/instructors" style={{ textDecoration: 'none', color: 'black' }}>
        ← Instructors
      </Link>
      <h2 className="fw-bold mb-4">Instructor Details</h2>
      <Row className="mb-2">
        <Col sm={3}><strong>Instructor ID:</strong></Col>
        <Col>{instructor.instructor_id}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>First Name:</strong></Col>
        <Col>{instructor.first_name}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Last Name:</strong></Col>
        <Col>{instructor.last_name}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>E-mail:</strong></Col>
        <Col>{instructor.email}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Department:</strong></Col>
        <Col>{instructor.department}</Col>
      </Row>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button variant="primary" onClick={() => navigate(`/instructors/${id}/update`)}>
          Update Instructor
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Instructor
        </Button>
      </div>
    </Container>
  );
}

export default InstructorDetails;
