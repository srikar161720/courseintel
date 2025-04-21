import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_id: '',
    title: '',
    department: '',
    course_num: '',
    credits: '',
    prerequisites: '',
    description: '',
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
      await axios.post('http://localhost:8000/api/courses/', formData);
      navigate(`/courses/${formData.course_id}`);
    } catch (err) {
      setError('Failed to add course. Please ensure all fields are valid and the ID is unique.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Add Course</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Editable Fields */}
        <Row className="mb-3">
          <Col sm={3}><strong>Course ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>Title:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>Department:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>Course #:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="course_num"
              value={formData.course_num}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>Credits:</strong></Col>
          <Col>
            <Form.Control
              type="number"
              name="credits"
              min="0"
              value={formData.credits}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>Prerequisites:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
              placeholder="Optional - Another course ID"
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col sm={3}><strong>Description:</strong></Col>
          <Col>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Optional course description"
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-center gap-3">
          <Button variant="danger" onClick={() => navigate('/courses')}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Add Course
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddCourse;
