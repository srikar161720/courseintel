from django.db import models


class Student(models.Model):
    student_id = models.CharField(max_length=9, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    start_date = models.DateField()
    program = models.CharField(max_length=100)
    gpa = models.DecimalField(max_digits=3, decimal_places=2)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Instructor(models.Model):
    instructor_id = models.CharField(max_length=9, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Course(models.Model):
    course_id = models.CharField(max_length=5, primary_key=True)
    title = models.CharField(max_length=150)
    department = models.CharField(max_length=100)
    course_num = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    credits = models.IntegerField()
    prerequisite = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, db_column='prerequisite')

    def __str__(self):
        return f"{self.course_num} - {self.title}"


class CourseSection(models.Model):
    section_id = models.CharField(max_length=5, primary_key=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    semester = models.CharField(max_length=20)
    year = models.IntegerField()
    schedule = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Section {self.section_id} ({self.semester} {self.year})"


class Enrollment(models.Model):
    enrollment_id = models.CharField(max_length=9, primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course_section = models.ForeignKey(CourseSection, on_delete=models.CASCADE, db_column='section_id')
    status = models.CharField(max_length=50)  # e.g., 'active', 'completed', 'dropped'
    grade = models.CharField(
        max_length=1,
        null=True,
        choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('F', 'F')]
    )
    enrollment_date = models.DateField()

    def __str__(self):
        return f"{self.student} - {self.course_section} - {self.status}"
