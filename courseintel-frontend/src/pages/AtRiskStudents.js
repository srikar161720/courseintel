import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import StudentTable from '../components/StudentTable';

function AtRiskStudents() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAtRiskStudents();
  }, []);

  const fetchAtRiskStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/students/');
      setStudents(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error('Error fetching at-risk students:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredResults = students.filter((student) => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      return (
        fullName.includes(search.toLowerCase()) ||
        student.program.toLowerCase().includes(search.toLowerCase()) ||
        String(student.student_id).includes(search)
      );
    });
    setFiltered(filteredResults);
  };

  return (
    <Container className="py-5">
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        ← Home
      </Link>
      <h2 className="fw-bold">At-Risk Students</h2>
      <p className="text-muted">
        Click on a student's name to view more details regarding their academic progress.
      </p>

      {/* Search Bar Only */}
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      {/* Table of At-Risk Students */}
      <StudentTable students={filtered} basePath="/at-risk" />
    </Container>
  );
}

export default AtRiskStudents;
