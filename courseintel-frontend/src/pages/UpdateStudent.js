import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    start_date: '',
    program: '',
    gpa: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current student info
  useEffect(() => {
    axios.get(`http://localhost:8000/api/students/${id}/`)
      .then((res) => {
        setStudent(res.data);
        setFormData({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
          start_date: res.data.start_date,
          program: res.data.program,
          gpa: res.data.gpa,
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Student not found');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/students/${id}/`, {
        student_id: id,  // Needed since it's a required field
        ...formData,
      });
      navigate(`/students/${id}`);
    } catch (err) {
      setError('Failed to update student');
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!student) return null;

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Update Student Details</h2>
      <Form onSubmit={handleSubmit}>
        {/* Student ID (read-only) */}
        <Row className="mb-3">
          <Col sm={3}><strong>Student ID:</strong></Col>
          <Col>
            <Form.Control plaintext readOnly value={student.student_id} />
          </Col>
        </Row>

        {/* Editable Fields */}
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

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button variant="danger" onClick={() => navigate(`/students/${id}`)}>
            Cancel Student Updates
          </Button>
          <Button type="submit" variant="success">
            Confirm Student Updates
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UpdateStudent;