from rest_framework import serializers 
from django.contrib.auth.models import User 

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('username', 'email', 'password')

    def validate_username(self,value):
        if User.objects.filter(username=value).exists():
            return serializers.ValidationError('Username already used')
        return value
    
    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            return serializers.ValidationError('Email already used')
        return value
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

