from django.contrib import admin
from .models import Student, Instructor, Course, CourseSection, Enrollment

admin.site.register(Student)
admin.site.register(Instructor)
admin.site.register(Course)
admin.site.register(CourseSection)
admin.site.register(Enrollment)