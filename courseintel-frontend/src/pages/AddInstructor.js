import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddInstructor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    instructor_id: '',
    first_name: '',
    last_name: '',
    email: '',
    department: '',
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
      await axios.post('http://localhost:8000/api/instructors/', formData);
      navigate(`/instructors/${formData.instructor_id}`);
    } catch (err) {
      setError('Failed to add instructor. Please make sure all fields are valid and the ID is unique.');
    }
  };

  const handleCancel = () => {
    navigate('/instructors');
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Add Instructor</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col sm={3}><strong>Instructor ID:</strong></Col>
          <Col>
            <Form.Control
              type="text"
              name="instructor_id"
              value={formData.instructor_id}
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

        <Row className="mb-4">
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

        <div className="d-flex justify-content-center gap-3">
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Add Instructor
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddInstructor;
