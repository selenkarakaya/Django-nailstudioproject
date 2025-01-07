from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ApptSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

class CreateUserView(generics.CreateAPIView): #Automatically provides support for HTTP POST requests to create a new resource.
    queryset = User.objects.all()             #Defines the database query this view will work with.
    serializer_class = UserSerializer         #Specifies the serializer to use for this view.
    permission_classes = [AllowAny]           #Defines who can access this view.



'''Purpose of CreateUserView
This view is specifically designed for user registration in an application.

It allows clients to send a POST request to create a new user.
Typical use case:
A registration page or form in a frontend application (e.g., React, Angular) sends user details (e.g., username, password) to this endpoint.
The user is then created in the database.'''   


# note add sending welcome emaol
