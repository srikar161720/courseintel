import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function UpdateInstructor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/instructors/${id}/`)
      .then((res) => {
        setInstructor(res.data);
        setFormData({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
          department: res.data.department,
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Instructor not found');
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
      await axios.put(`http://localhost:8000/api/instructors/${id}/`, {
        instructor_id: id, // explicitly pass the ID
        ...formData,
      });
      navigate(`/instructors/${id}`);
    } catch (err) {
      setError('Failed to update instructor');
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!instructor) return null;

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Update Instructor Details</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col sm={3}><strong>Instructor ID:</strong></Col>
          <Col>
            <Form.Control plaintext readOnly value={instructor.instructor_id} />
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

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button variant="danger" onClick={() => navigate(`/instructors/${id}`)}>
            Cancel Instructor Updates
          </Button>
          <Button type="submit" variant="success">
            Confirm Instructor Updates
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UpdateInstructor;
