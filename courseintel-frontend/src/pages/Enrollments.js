import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import EnrollmentTable from '../components/EnrollmentTable';

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/enrollments/');
      setEnrollments(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = search.toLowerCase();

    const filteredResults = enrollments.filter((enrollment) => {
      return (
        enrollment.enrollment_id.toLowerCase().includes(term) ||
        enrollment.student.toLowerCase().includes(term) ||
        enrollment.course_section.toLowerCase().includes(term) ||
        enrollment.status.toLowerCase().includes(term) ||
        enrollment.grade?.toLowerCase().includes(term) ||
        enrollment.enrollment_date.toLowerCase().includes(term)
      );
    });

    setFiltered(filteredResults);
  };

  return (
    <Container className="py-5">
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        ← Home
      </Link>
      <h2 className="fw-bold">Enrollments</h2>
      <p className="text-muted">
        Click on the "Add Enrollment" button to add a new enrollment record. You can also click on an enrollment record to view more details or update/delete its information.
      </p>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button variant="success" onClick={() => navigate('/add-enrollment')}>
          Add Enrollment
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      <EnrollmentTable enrollments={filtered} />
    </Container>
  );
}

export default Enrollments;