from django.urls import path 
from .views import register, login, NewCourseRequest, test, RequestCourse, RequestLecture, DeleteCourse

urlpatterns = [
    path('register', register.as_view()),
    path('login', login.as_view()),
    path('create_course', NewCourseRequest.as_view()),
    path('course_request', RequestCourse.as_view()),
    path('request_lecture', RequestLecture.as_view()),
    path('deleteCourse', DeleteCourse.as_view()),
    path('test',test.as_view())
]