from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, authenticate

from .serializer import UserSerializer, LoginSerializer


class register(APIView):
        def post(self,request):
            serializer = UserSerializer(data = dict(request.data))
            if serializer.is_valid():
                user = serializer.save()
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
            return Response("None")