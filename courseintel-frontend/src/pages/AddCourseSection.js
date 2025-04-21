import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddCourseSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    section_id: '',
    course: '',
    instructor: '',
    semester: '',
    year: '',
    schedule: '',
    location: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/course-sections/', formData);
      navigate(`/course-sections/${formData.section_id}`);
    } catch (err) {
      setError('Failed to add course section. Make sure all fields are valid and the Section ID is unique.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Add Course Section</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Section ID */}
        <Row className="mb-3">
          <Col sm={3}><strong>Section ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="section_id"
              value={formData.section_id}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Course ID (read-only) */}
        <Row className="mb-3">
          <Col sm={3}><strong>Course ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Instructor ID */}
        <Row className="mb-3">
          <Col sm={3}><strong>Instructor ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Semester */}
        <Row className="mb-3">
          <Col sm={3}><strong>Semester:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Year */}
        <Row className="mb-3">
          <Col sm={3}><strong>Year:</strong></Col>
          <Col>
            <Form.Control
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Schedule */}
        <Row className="mb-3">
          <Col sm={3}><strong>Schedule:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* Location */}
        <Row className="mb-4">
          <Col sm={3}><strong>Location:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-center gap-3">
          <Button variant="danger" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Add Course Section
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddCourseSection;
