import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';

// Students
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import UpdateStudent from './pages/UpdateStudent';
import AddStudent from './pages/AddStudent';

// Instructors
import Instructors from './pages/Instructors';
import InstructorDetails from './pages/InstructorDetails';
import UpdateInstructor from './pages/UpdateInstructor';
import AddInstructor from './pages/AddInstructor';

// Enrollments
import Enrollments from './pages/Enrollments';
import EnrollmentDetails from './pages/EnrollmentDetails';
import UpdateEnrollment from './pages/UpdateEnrollment';
import AddEnrollment from './pages/AddEnrollment';

// Courses
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import UpdateCourse from './pages/UpdateCourse';
import AddCourse from './pages/AddCourse';

// Course Sections
import CourseSectionDetails from './pages/CourseSectionDetails';
import UpdateCourseSection from './pages/UpdateCourseSection';
import AddCourseSection from './pages/AddCourseSection';

// At-Risk
import AtRiskStudents from './pages/AtRiskStudents';
import AtRiskStudentDetails from './pages/AtRiskStudentDetails';

function App() {
  return (
    <Layout>
        <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Students */}
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="/students/:id/update" element={<UpdateStudent />} />
            <Route path="/add-student" element={<AddStudent />} />

            {/* Instructors */}
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/instructors/:id" element={<InstructorDetails />} />
            <Route path="/instructors/:id/update" element={<UpdateInstructor />} />
            <Route path="/add-instructor" element={<AddInstructor />} />

            {/* Enrollments */}
            <Route path="/enrollments" element={<Enrollments />} />
            <Route path="/enrollments/:id" element={<EnrollmentDetails />} />
            <Route path="/enrollments/:id/update" element={<UpdateEnrollment />} />
            <Route path="/add-enrollment" element={<AddEnrollment />} />

            {/* Courses */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route path="/add-course" element={<AddCourse />} />

            {/* Course Sections */}
            <Route path="/course-sections/:id" element={<CourseSectionDetails />} />
            <Route path="/course-sections/:id/update" element={<UpdateCourseSection />} />
            <Route path="/add-course-section" element={<AddCourseSection />} />

            {/* At-Risk Students */}
            <Route path="/at-risk" element={<AtRiskStudents />} />
            <Route path="/at-risk/:id" element={<AtRiskStudentDetails />} />
        </Routes>
    </Layout>
  );
}

export default App;