import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function CourseSectionDetails() {
  const { id } = useParams(); // section_id
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/course-sections/${id}/`)
      .then((res) => {
        setSection(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Course section not found');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this course section?');
    if (!confirmed) return;

    axios.delete(`http://localhost:8000/api/course-sections/${id}/`)
      .then(() => navigate(`/courses/${section.course_id}`))  // Redirect to associated course
      .catch(() => setError('Failed to delete course section'));
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!section) return null;

  return (
    <Container className="py-5">
      <Link to={`/courses/${section.course}`} style={{ textDecoration: 'none', color: 'black' }}>
        ← Course
      </Link>
      <h2 className="fw-bold mb-4">Course Section Details</h2>

      <Row className="mb-2">
        <Col sm={3}><strong>Section ID:</strong></Col>
        <Col>{section.section_id}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Course ID:</strong></Col>
        <Col>{section.course}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Instructor ID:</strong></Col>
        <Col>{section.instructor}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Semester:</strong></Col>
        <Col>{section.semester}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Year:</strong></Col>
        <Col>{section.year}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Schedule:</strong></Col>
        <Col>{section.schedule || 'N/A'}</Col>
      </Row>
      <Row className="mb-4">
        <Col sm={3}><strong>Location:</strong></Col>
        <Col>{section.location || 'N/A'}</Col>
      </Row>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary" onClick={() => navigate(`/course-sections/${id}/update`)}>
          Update Section
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Section
        </Button>
      </div>
    </Container>
  );
}

export default CourseSectionDetails;
