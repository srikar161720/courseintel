import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import InstructorTable from '../components/InstructorTable';

function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/instructors/');
      setInstructors(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredResults = instructors.filter((instructor) => {
      const fullName = `${instructor.first_name} ${instructor.last_name}`.toLowerCase();
      return (
        fullName.includes(search.toLowerCase()) ||
        instructor.department.toLowerCase().includes(search.toLowerCase()) ||
        String(instructor.instructor_id).includes(search)
      );
    });
    setFiltered(filteredResults);
  };

  return (
    <Container className="py-5">
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        ← Home
      </Link>
      <h2 className="fw-bold">Instructors</h2>
      <p className="text-muted">
        Click on the "Add Instructor" button to add a new instructor record. You can also click on an instructor's name to view more details or update/delete their information.
      </p>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button variant="success" onClick={() => navigate('/add-instructor')}>
          Add Instructor
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      <InstructorTable instructors={filtered} />
    </Container>
  );
}

export default Instructors;