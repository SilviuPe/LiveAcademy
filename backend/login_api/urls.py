from django.urls import path 
from .views import register, login, NewCourseRequest, test, RequestCourse

urlpatterns = [
    path('register', register.as_view()),
    path('login', login.as_view()),
    path('create_course', NewCourseRequest.as_view()),
    path('course_request', RequestCourse.as_view()),
    path('test',test.as_view())
]