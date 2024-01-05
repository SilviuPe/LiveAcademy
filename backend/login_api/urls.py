from django.urls import path 
from .views import register, login, NewCourseRequest, test

urlpatterns = [
    path('register', register.as_view()),
    path('login', login.as_view()),
    path('course_request', NewCourseRequest.as_view()),
    path('test',test.as_view())
]