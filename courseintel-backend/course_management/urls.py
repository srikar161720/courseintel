"""
URL configuration for course_management project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from course_management_sys.views import (
    StudentViewSet, InstructorViewSet, CourseViewSet,
    CourseSectionViewSet, EnrollmentViewSet,
    AtRiskStudentListView, AtRiskStudentDetailView,
    CourseSectionListByCourseView
)

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'instructors', InstructorViewSet, basename='instructor')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'course-sections', CourseSectionViewSet, basename='coursesection')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/courses/<str:pk>/sections/', CourseSectionListByCourseView.as_view(), name='course-sections-by-course'),

    # Include standard CRUD routes
    path('api/', include(router.urls)),

    # Custom routes
    path('api/students/at-risk/', AtRiskStudentListView.as_view(), name='at-risk-student-list'),
    path('api/students/<int:pk>/at-risk-details/', AtRiskStudentDetailView.as_view(), name='at-risk-student-detail'),
]
