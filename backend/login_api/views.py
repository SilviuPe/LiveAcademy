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
                user = serializer.save()
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
            return Response("None")


class login(APIView):
    def post(self,request):
        serializer = LoginSerializer(data = dict(request.data))
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = User.objects.filter(username=username,password=password)[0]
            if user is not None:
                login(request=request,user=user)
                return Response({"Message":"Login succesfully"},status=status.HTTP_200_OK)
        return Response({"Message":"Login failed"},status=status.HTTP_400_BAD_REQUEST)