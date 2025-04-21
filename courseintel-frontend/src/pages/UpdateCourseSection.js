import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function UpdateCourseSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [formData, setFormData] = useState({
    semester: '',
    year: '',
    schedule: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch section details on mount
  useEffect(() => {
    axios.get(`http://localhost:8000/api/course-sections/${id}/`)
      .then((res) => {
        setSection(res.data);
        setFormData({
          semester: res.data.semester,
          year: res.data.year,
          schedule: res.data.schedule || '',
          location: res.data.location || '',
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Course section not found');
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
      await axios.put(`http://localhost:8000/api/course-sections/${id}/`, {
        section_id: id,
        course: section.course,
        instructor: section.instructor,
        ...formData,
      });
      navigate(`/course-sections/${id}`);
    } catch (err) {
      setError('Failed to update course section');
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;
  if (!section) return null;

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Update Course Section Details</h2>
      <Form onSubmit={handleSubmit}>
        {/* Read-only fields */}
        <Row className="mb-3">
          <Col sm={3}><strong>Section ID:</strong></Col>
          <Col><Form.Control plaintext readOnly value={section.section_id} /></Col>
        </Row>
        <Row className="mb-3">
          <Col sm={3}><strong>Course ID:</strong></Col>
          <Col><Form.Control plaintext readOnly value={section.course} /></Col>
        </Row>
        <Row className="mb-3">
          <Col sm={3}><strong>Instructor ID:</strong></Col>
          <Col><Form.Control plaintext readOnly value={section.instructor} /></Col>
        </Row>

        {/* Editable fields */}
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

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button variant="danger" onClick={() => navigate(`/course-sections/${id}`)}>
            Cancel Course Section Updates
          </Button>
          <Button type="submit" variant="success">
            Confirm Course Section Updates
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default UpdateCourseSection;
