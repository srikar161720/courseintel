import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Container className="py-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Welcome to CourseIntel!</h1>
          <p className="text-muted">
            CourseIntel is a comprehensive platform designed to enhance the educational experience for students, instructors, and administrators alike. Our mission is to provide a seamless and efficient way to manage courses, track student progress, and facilitate communication between all parties involved in the learning process.
          </p>
        </div>

        {/* Records Section */}
        <h3 className="fw-bold mb-3">Records</h3>
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="/images/students.jpg" />
              <Card.Body>
                <Card.Title>Students</Card.Title>
                <Card.Text>View, update, and delete Student records.</Card.Text>
                <Link to="/students">
                  <Button variant="primary">View Students</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="/images/instructors.jpg" />
              <Card.Body>
                <Card.Title>Instructors</Card.Title>
                <Card.Text>View, update, and delete Instructor records.</Card.Text>
                <Link to="/instructors">
                  <Button variant="primary">View Instructors</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="/images/enrollments.jpg" />
              <Card.Body>
                <Card.Title>Enrollments</Card.Title>
                <Card.Text>View, update, and delete Enrollment records.</Card.Text>
                <Link to="/enrollments">
                  <Button variant="primary">View Enrollments</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Course Catalog Section */}
        <h3 className="fw-bold mb-3">Course Catalog</h3>
        <Row className="mb-5">
          <Col>
            <Card className="mb-4">
              <Card.Img variant="top" src="/images/courses.jpg" />
              <Card.Body>
                <Card.Title>Courses</Card.Title>
                <Card.Text>View, update, and delete Course records along with Course Section records. </Card.Text>
                <Link to="/courses">
                  <Button variant="primary">View Courses</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Student Resources Section */}
        <h3 className="fw-bold mb-3">Student Resources & Analytics</h3>
        <Row className="mb-5">
          <Col className="mb-4">
            <Card>
              <Card.Img variant="top" src="/images/atrisk.jpg" />
              <Card.Body>
                <Card.Title>At-Risk Student Information</Card.Title>
                <Card.Text>View Student information related to </Card.Text>
                <Link to="/at-risk">
                  <Button variant="primary">View At-Risk Students</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Admin Login Prompt */}
      </Container>
      <div className="bg-light p-4 text-center">
        <h5 className="fw-bold mb-3">Are you an Admin? Login using the Admin Portal</h5>
        <a href="http://localhost:8000/admin/">
          <Button variant="dark">Admin</Button>
        </a>
      </div>
    </div>
  );
}

export default Home;
