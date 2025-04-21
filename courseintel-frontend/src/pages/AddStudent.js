import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    email: '',
    start_date: '',
    program: '',
    gpa: '',
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
      await axios.post('http://localhost:8000/api/students/', formData);
      navigate(`/students/${formData.student_id}`);
    } catch (err) {
      setError('Failed to add student. Please make sure all fields are valid and the ID is unique.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Add Student</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Editable Fields */}
        <Row className="mb-3">
          <Col sm={3}><strong>Student ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>First Name:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>Last Name:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>E-mail:</strong></Col>
          <Col>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>Start Date:</strong></Col>
          <Col>
            <Form.Control
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}><strong>Program:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col sm={3}><strong>GPA:</strong></Col>
          <Col>
            <Form.Control
              type="number"
              name="gpa"
              step="0.01"
              min="0"
              max="4"
              value={formData.gpa}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-center gap-3">
          <Button variant="danger" onClick={() => navigate('/students')}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Add Student
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddStudent;