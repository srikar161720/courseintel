import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import CourseTable from '../components/CourseTable';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/courses/');
      setCourses(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredResults = courses.filter((course) => {
      const combined = `${course.title} ${course.department} ${course.course_num}`.toLowerCase();
      return (
        combined.includes(search.toLowerCase()) ||
        String(course.course_id).includes(search)
      );
    });
    setFiltered(filteredResults);
  };

  return (
    <Container className="py-5">
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        ← Home
      </Link>
      <h2 className="fw-bold">Courses</h2>
      <p className="text-muted">
        Click on the "Add Course" button to add a new course to the catalog. You can also click on a course to view more details (course sections) or update/delete its information.
      </p>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button variant="success" onClick={() => navigate('/add-course')}>
          Add Course
        </Button>
      </div>

      <SearchBar
        value={search}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      <CourseTable courses={filtered} />
    </Container>
  );
}

export default Courses;
