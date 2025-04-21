import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    course_num: '',
    credits: '',
    prerequisites: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current course info
  useEffect(() => {
    axios.get(`http://localhost:8000/api/courses/${id}/`)
      .then((res) => {
        setCourse(res.data);
        setFormData({
          title: res.data.title || '',
          department: res.data.department || '',
          course_num: res.data.course_num || '',
          credits: res.data.credits || '',
          prerequisites: res.data.prerequisites || '',
          description: res.data.description || '',
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Course not found');
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
      await axios.put(`http://localhost:8000/api/courses/${id}/`, {
        course_id: id,  // Required for update
        ...formData,
      });
      navigate(`/courses/${id}`);
    } catch (err) {
      setError('Failed to update course');
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!course) return null;

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Update Course Details</h2>
      <Form onSubmit={handleSubmit}>
        {/* Course ID (read-only) */}
        <Row className="mb-3">
          <Col sm={3}><strong>Course ID:</strong></Col>
          <Col>
            <Form.Control plaintext readOnly value={id} />
          </Col>
        </Row>

        {/* Editable Fields */}
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
              value={formData.credits}
              onChange={handleChange}
              required
              min="0"
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
              placeholder="Optional - another course_id"
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col sm={3}><strong>Description:</strong></Col>
          <Col>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-center gap-3">
          <Button variant="danger" onClick={() => navigate(`/courses/${id}`)}>
            Cancel Course Updates
          </Button>
          <Button type="submit" variant="success">
            Confirm Course Updates
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UpdateCourse;
