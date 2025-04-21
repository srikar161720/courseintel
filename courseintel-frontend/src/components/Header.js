import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="warning" expand="lg" className="px-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          CourseIntel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/students">Students</Nav.Link>
            <Nav.Link as={Link} to="/instructors">Instructors</Nav.Link>
            <Nav.Link as={Link} to="/enrollments">Enrollments</Nav.Link>
            <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            <Nav.Link as={Link} to="/at-risk">At-Risk Student Information</Nav.Link>
            {/*<NavDropdown title="More" id="more-dropdown">
              <NavDropdown.Item as={Link} to="/recommendations">Course Recommendations</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/at-risk">At-Risk Students</NavDropdown.Item>
            </NavDropdown>*/}
          </Nav>
          <Button variant="dark" as={Link} to="http://localhost:8000/admin/">Admin</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
