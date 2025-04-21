import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import StudentTable from '../components/StudentTable';

function Students() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/students/');
      setStudents(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
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
      <h2 className="fw-bold">Students</h2>
      <p className="text-muted">
        Click on the "Add Student" button to add a new student record. You can also click on a student's name to view more details or update/delete their information.
      </p>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button variant="success" onClick={() => navigate('/add-student')}>
          Add Student
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      <StudentTable students={filtered} />
    </Container>
  );
}

export default Students;