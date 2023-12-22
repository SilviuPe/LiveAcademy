from django.db import models
import random, string 
from django.contrib.auth.models import User
# Create your models here.

def generate_random_id():
    code = ''.join(random.choice(string.digits + string.ascii_letters) for i in range(20)) # initiate code 

    # Check if there are existing objects with that id 
    course_ = Course.objects.filter(id = code).exists()
    chart_ = Chart.objects.filter(id = code).exists()
    lecture_ = Lecture.objects.filter(id = code).exists()
    # If yes, change the code till a new one is generated
    while course_ or chart_ or lecture_:
        code = ''.join(random.choice(string.digits + string.ascii_letters) for i in range(20))
    return code

class Course(models.Model):
    id = models.CharField(max_length=20, primary_key = True, default = generate_random_id, editable = False, unique = True)
    title = models.CharField(max_length=20, default = '')
    created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE, default = None)

class Chart(models.Model):
    id = models.CharField(max_length=20, primary_key = True, default = generate_random_id, editable = False, unique = True)
    title = models.CharField(max_length=20, default = '')
    lecture_count = models.IntegerField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

class Lecture(models.Model):
    id = models.CharField(max_length=20, primary_key = True, default = generate_random_id, editable = False, unique = True)
    title = models.CharField(max_length=40, default = '')
    path = models.CharField(max_length=100,default = '')
    duration = models.DurationField()
    chart = models.ForeignKey(Chart,on_delete=models.CASCADE)
    document_type = models.CharField(max_length=20,default = 'html_document')