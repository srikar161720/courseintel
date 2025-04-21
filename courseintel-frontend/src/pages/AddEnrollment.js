import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddEnrollment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    enrollment_id: '',
    student: '',
    course_section: '',
    status: '',
    grade: '',
    enrollment_date: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForeignKeys = async () => {
    try {
      const [studentRes, sectionRes] = await Promise.all([
        axios.get(`http://localhost:8000/api/students/${formData.student}/`),
        axios.get(`http://localhost:8000/api/course-sections/${formData.course_section}/`)
      ]);
      return studentRes.status === 200 && sectionRes.status === 200;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = await validateForeignKeys();
    if (!valid) {
      setError('Student ID or Section ID does not exist. Please check your input.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/enrollments/', {
        ...formData,
        grade: formData.grade === '' ? null : formData.grade
      });
      navigate(`/enrollments/${res.data.enrollment_id}`);
    } catch (err) {
      setError('Failed to add enrollment. Please make sure all fields are valid and the ID is unique.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Add Enrollment</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Enrollment ID */}
        <Row className="mb-3">
          <Col sm={3}><strong>Enrollment ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="enrollment_id"
              value={formData.enrollment_id}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Student ID */}
        <Row className="mb-3">
          <Col sm={3}><strong>Student ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="student"
              value={formData.student}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Section ID */}
        <Row className="mb-3">
          <Col sm={3}><strong>Section ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="course_section"
              value={formData.course_section}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Status */}
        <Row className="mb-3">
          <Col sm={3}><strong>Status:</strong></Col>
          <Col>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="DROPPED">DROPPED</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Grade */}
        <Row className="mb-3">
          <Col sm={3}><strong>Grade:</strong></Col>
          <Col>
            <Form.Select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            >
              <option value="">-- None --</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Enrollment Date */}
        <Row className="mb-4">
          <Col sm={3}><strong>Enrollment Date:</strong></Col>
          <Col>
            <Form.Control
              type="date"
              name="enrollment_date"
              value={formData.enrollment_date}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <Button variant="danger" onClick={() => navigate('/enrollments')}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Add Enrollment
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddEnrollment;
