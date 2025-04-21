from django.shortcuts import render
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Student, Instructor, Course, CourseSection, Enrollment
from .serializers import (
    StudentSerializer, InstructorSerializer, CourseSerializer,
    CourseSectionSerializer, EnrollmentSerializer,
    AtRiskStudentSerializer, CourseWithSectionsSerializer
)
from django.db.models import Q


# ---- STUDENTS ----
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('student_id')
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['program']
    search_fields = ['first_name', 'last_name', 'email']


# ---- INSTRUCTORS ----
class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all().order_by('instructor_id')
    serializer_class = InstructorSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'email', 'department']


# ---- COURSES ----
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('course_id')
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['title', 'course_num', 'description']

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CourseWithSectionsSerializer(instance)
        return Response(serializer.data)


# ---- COURSE SECTIONS ----
class CourseSectionViewSet(viewsets.ModelViewSet):
    queryset = CourseSection.objects.all().order_by('section_id')
    serializer_class = CourseSectionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['course_id', 'instructor_id']
    search_fields = ['semester', 'year']


class CourseSectionListByCourseView(generics.ListAPIView):
    serializer_class = CourseSectionSerializer

    def get_queryset(self):
        course_id = self.kwargs['pk']
        return CourseSection.objects.filter(course_id=course_id)


# ---- ENROLLMENTS ----
class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all().order_by('enrollment_id')
    serializer_class = EnrollmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['student_id', 'course_section', 'status', 'grade']
    search_fields = ['student_id__first_name', 'student_id__last_name']


# ---- AT-RISK STUDENTS ----
class AtRiskStudentListView(APIView):
    def get(self, request):
        students = Student.objects.all()
        at_risk_students = []

        for student in students:
            enrollments = Enrollment.objects.filter(student_id=student)
            dropped_count = enrollments.filter(status="dropped").count()
            failed_count = enrollments.filter(grade__in=["D", "F"]).count()

            if (student.gpa is not None and student.gpa < 2.25) or dropped_count >= 5 or failed_count >= 3:
                at_risk_students.append(student)

        serializer = AtRiskStudentSerializer(at_risk_students, many=True)
        return Response(serializer.data)


class AtRiskStudentDetailView(APIView):
    def get(self, request, pk):
        student = Student.objects.get(pk=pk)
        enrollments = Enrollment.objects.select_related('course_section').filter(student_id=student)
        dropped_courses = enrollments.filter(status="dropped")
        failed_courses = enrollments.filter(grade__in=["D", "F"])

        student_data = AtRiskStudentSerializer(student).data
        return Response({
            "student": student_data,
            "gpa": round(student.gpa, 2) if student.gpa is not None else "N/A",
            "at_risk": (student.gpa is not None and student.gpa < 2.25) or dropped_courses.count() >= 5 or failed_courses.count() >= 3,
            "dropped_courses": EnrollmentSerializer(dropped_courses, many=True).data or "No course dropped",
            "failed_courses": EnrollmentSerializer(failed_courses, many=True).data or "No course failed"
        })
