from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, authenticate

from django.contrib.auth.models import User

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
            user = User.objects.filter(username=username,password=password).exists()
            if user:
                login(request=request,user=user)
                return Response({"Message":"Login succesfully"},status=status.HTTP_200_OK)
        return Response({"Error":"Login failed"},status=status.HTTP_400_BAD_REQUEST)