import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function UpdateEnrollment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    grade: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch enrollment details on mount
  useEffect(() => {
    axios.get(`http://localhost:8000/api/enrollments/${id}/`)
      .then((res) => {
        setEnrollment(res.data);
        setFormData({
          status: res.data.status,
          grade: res.data.grade || '',
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Enrollment not found');
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
      await axios.put(`http://localhost:8000/api/enrollments/${id}/`, {
        enrollment_id: id,
        student: enrollment.student,
        course_section: enrollment.course_section,
        enrollment_date: enrollment.enrollment_date,
        ...formData,
        grade: formData.grade === '' ? null : formData.grade
      });
      navigate(`/enrollments/${id}`);
    } catch (err) {
      setError('Failed to update enrollment');
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!enrollment) return null;

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Update Enrollment Details</h2>
      <Form onSubmit={handleSubmit}>
        {/* Read-only fields */}
        <Row className="mb-3">
          <Col sm={3}><strong>Enrollment ID:</strong></Col>
          <Col><Form.Control plaintext readOnly value={enrollment.enrollment_id} /></Col>
        </Row>
        <Row className="mb-3">
          <Col sm={3}><strong>Student ID:</strong></Col>
          <Col><Form.Control plaintext readOnly value={enrollment.student} /></Col>
        </Row>
        <Row className="mb-3">
          <Col sm={3}><strong>Section ID:</strong></Col>
          <Col><Form.Control plaintext readOnly value={enrollment.course_section} /></Col>
        </Row>

        {/* Editable fields */}
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

        <Row className="mb-4">
          <Col sm={3}><strong>Date:</strong></Col>
          <Col><Form.Control plaintext readOnly value={enrollment.enrollment_date} /></Col>
        </Row>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button variant="danger" onClick={() => navigate(`/enrollments/${id}`)}>
            Cancel Enrollment Updates
          </Button>
          <Button type="submit" variant="success">
            Confirm Enrollment Updates
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UpdateEnrollment;
