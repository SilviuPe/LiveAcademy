from django.urls import path 
from .views import register, login

urlpatterns = [
    path('register', register.as_view()),
    path('login', login.as_view())
]