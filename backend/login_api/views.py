from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth import login as log
from django.contrib.auth.models import User
from .models import Course, Chapter, Lecture
from .serializer import UserSerializer, LoginSerializer


class register(APIView):
        def post(self,request):
            serializer = UserSerializer(data = dict(request.data))
            if serializer.is_valid():
                if User.objects.filter(email = serializer.validated_data['email']).exists():
                     return Response({ "Error" : "A user with that email already exists." },status=status.HTTP_400_BAD_REQUEST)
                else:
                    user = serializer.save()
                    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
            else:
                    error = list(serializer.errors)[0] # Take the first key from errors
                    error = serializer.errors[error][0] # Take the first error from errors list
                    return Response({ "Error" : error },status=status.HTTP_400_BAD_REQUEST)

class login(APIView):
    def post(self,request):
        serializer = LoginSerializer(data = dict(request.data))
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = User.objects.filter(username=username,password=password)[0]
            if user != None: 
                return Response({"Message":"Login succesfully", "username" : user.username },status=status.HTTP_200_OK)
        return Response({"Error":"Login failed"},status=status.HTTP_400_BAD_REQUEST)


class NewCourseRequest(APIView):

    def post(self,request):
        data = dict(request.data)
        print(data['CourseID'])
        status_code = status.HTTP_400_BAD_REQUEST
        filterMessage = self.filterCourse(data)
        if "Message" in filterMessage:
            if 'CourseID' in data:
                course = Course.objects.filter(id = data['CourseID'])
                if len(course) > 0: 
                    course[0].delete()
            newCourse = self.createNewCourse(dict(request.data))
            newCourse.save()
            filterMessage['CourseID'] = newCourse.id 
            self.createNewChapters(dict(request.data)['Chapters'],newCourse.id)
            status_code = status.HTTP_201_CREATED
        return Response(filterMessage, status= status_code)
        



    def createNewCourse(self,courseStructure):
        title = courseStructure['CourseTitle']
        user = User.objects.filter(username=courseStructure['Author'])[0]
        return Course(title = title, author = user)
    
    def createNewChapters(self,ChaptersList,courseID):
        for chapter in ChaptersList:
            lecture_count = len(list(ChaptersList[chapter]['lectures']))
            newChapter = Chapter(title = chapter, 
                                lecture_count = lecture_count, 
                                course = Course.objects.filter(id = courseID)[0])
            newChapter.save()
            self.createNewLectures(ChaptersList[chapter]['lectures'],newChapter.id)


    def createNewLectures(self,LectureList,chapterID):
        for lecture in LectureList:
            newLecture = Lecture(title = lecture, 
                                chapter = Chapter.objects.filter(id = chapterID)[0])
            newLecture.save()


    def filterCourse(self,courseStructure):
        title = courseStructure['CourseTitle']
        chapter_list = courseStructure['Chapters']
        user = User.objects.filter(username = courseStructure['Author']).exists()
        if len(title) <= 0:
            return {"Error" : "Title of the course is missing!"} 
        if not user:
            return {"Error" : "An user with that name doesn't exist!"} 
        if len(chapter_list) <= 0:
            return {"Error" : "Chapters missing!"}
        for chapter in chapter_list:
            lectures = chapter_list[chapter]
            if len(lectures['lectures']) <= 0:
                return {"Error" : "Lectures missing!"}
        
        return {"Message" : "Course succesfully created!"}

class test(APIView):
    def get(self,request):
        print(type(request.user.username),request.user.username)
        return Response('asdsad')



class RequestCourse(APIView):
    def get(self,request):
        user = User.objects.filter(username = request.GET.get('username'))
        if user.exists():
            course = Course.objects.filter(author = user[0])
            if course.exists():
                courseJSON = {
                    'Chapters' : {

                    }
                }
                courseJSON['CourseTitle'] = course[0].title
                courseJSON['Author'] = course[0].author.username
                courseJSON['CourseID'] = course[0].id
                chapters = Chapter.objects.filter(course=course[0])
                for chapter in chapters:  
                    courseJSON['Chapters'][chapter.title] = {
                        "lectures" : {

                        }
                    }
                    for lecture in Lecture.objects.filter(chapter=chapter):
                        courseJSON['Chapters'][chapter.title]['lectures'][lecture.title] = {
                            "lectureType" : '',
                            "path" : ''
                        }
                return Response({'CourseStructure' : courseJSON}, status=status.HTTP_200_OK)
            return Response({'Message' : 'User has no courses.'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'Error' : "There was an error with the server."}, status=status.HTTP_400_BAD_REQUEST)