import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

import SectionTable from '../components/SectionTable';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course details
  useEffect(() => {
    axios.get(`http://localhost:8000/api/courses/${id}/`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Course not found');
        setLoading(false);
      });

    axios.get(`http://localhost:8000/api/courses/${id}/sections/`)
      .then((res) => setSections(res.data))
      .catch((err) => console.error('Error fetching sections:', err));
  }, [id]);

  // Delete course
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this course? This will also delete all associated sections.');
    if (!confirmed) return;

    axios.delete(`http://localhost:8000/api/courses/${id}/`)
      .then(() => navigate('/courses'))
      .catch(() => setError('Failed to delete course'));
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!course) return null;

  return (
    <Container className="py-5">
      <Link to="/courses" style={{ textDecoration: 'none', color: 'black' }}>
        ← Courses
      </Link>
      <h2 className="fw-bold mb-4">Course Details</h2>

      <Row className="mb-2">
        <Col sm={3}><strong>Course ID:</strong></Col>
        <Col>{course.course_id}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Title:</strong></Col>
        <Col>{course.title}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Department:</strong></Col>
        <Col>{course.department}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Course #:</strong></Col>
        <Col>{course.course_num}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Credits:</strong></Col>
        <Col>{course.credits}</Col>
      </Row>
      <Row className="mb-2">
        <Col sm={3}><strong>Prerequisites:</strong></Col>
        <Col>{course.prerequisites || 'None'}</Col>
      </Row>
      <Row className="mb-4">
        <Col sm={3}><strong>Description:</strong></Col>
        <Col>{course.description || 'A course description will be displayed here at a later time.'}</Col>
      </Row>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <Button variant="success" onClick={() => navigate(`/add-course-section`)}>
          Add Course Section
        </Button>
        <Button variant="primary" onClick={() => navigate(`/courses/${id}/update`)}>
          Update Course
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Course
        </Button>
      </div>

      <div className="text-danger text-center mb-4 fw-bold">
        WARNING: Deleting a Course will also delete all associated Sections of the Course
      </div>

      <h4 className="fw-bold mt-5">Course Sections</h4>
      <SectionTable sections={sections} />
    </Container>
  );
}

export default CourseDetails;
