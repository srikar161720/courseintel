import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-light border-top py-3 text-center mt-5">
      <div className="container">
        <small className="text-muted d-block mb-2">
          <Link to="/" className="fw-bold text-decoration-none me-2">CourseIntel</Link>
          &copy; {new Date().getFullYear()}
        </small>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <Link to="/students" className="text-muted text-decoration-none">Students</Link>
          <Link to="/instructors" className="text-muted text-decoration-none">Instructors</Link>
          <Link to="/enrollments" className="text-muted text-decoration-none">Enrollments</Link>
          <Link to="/courses" className="text-muted text-decoration-none">Courses</Link>
          <Link to="/recommendations" className="text-muted text-decoration-none">Course Recommendations</Link>
          <Link to="/at-risk" className="text-muted text-decoration-none">At-Risk Students</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;