from rest_framework import serializers
from .models import Student, Instructor, Course, CourseSection, Enrollment


# ---- STUDENT ----
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'first_name', 'last_name', 'email', 'start_date', 'program', 'gpa']


# ---- INSTRUCTOR ----
class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['instructor_id', 'first_name', 'last_name', 'email', 'department']


# ---- COURSE SECTION ----
class CourseSectionSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    instructor_name = serializers.SerializerMethodField()

    class Meta:
        model = CourseSection
        fields = [
            'section_id', 'course', 'instructor', 'semester', 'year',
            'schedule', 'location', 'course_title', 'instructor_name'
        ]

    def get_instructor_name(self, obj):
        if obj.instructor:
            return f"{obj.instructor.first_name} {obj.instructor.last_name}"
        return None


# ---- COURSE ----
class CourseSerializer(serializers.ModelSerializer):
    prerequisite_title = serializers.CharField(source='prerequisite.title', read_only=True)

    class Meta:
        model = Course
        fields = [
            'course_id', 'title', 'department', 'course_num', 'credits',
            'description', 'prerequisite', 'prerequisite_title'
        ]


# ---- COURSE WITH SECTIONS (Optional Nested Use) ----
class CourseWithSectionsSerializer(serializers.ModelSerializer):
    sections = CourseSectionSerializer(source='coursesection_set', many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            'course_id', 'title', 'department', 'course_num', 'credits',
            'description', 'prerequisite', 'sections'
        ]


# ---- ENROLLMENT ----
class EnrollmentSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    course_title = serializers.SerializerMethodField()
    section_id = serializers.SerializerMethodField()
    semester = serializers.SerializerMethodField()

    class Meta:
        model = Enrollment
        fields = [
            'enrollment_id', 'student', 'course_section', 'status', 'grade',
            'enrollment_date', 'student_name', 'course_title', 'section_id', 'semester'
        ]

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"

    def get_course_title(self, obj):
        try:
            return obj.course_section.course.title
        except AttributeError:
            return None

    def get_section_id(self, obj):
        try:
            return obj.course_section.section_id
        except AttributeError:
            return None

    def get_semester(self, obj):
        try:
            return obj.course_section.semester
        except AttributeError:
            return None


# ---- AT-RISK STUDENTS ----
class AtRiskStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'first_name', 'last_name', 'email', 'program', 'gpa']
