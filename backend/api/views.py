from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ApptSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Appt

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

class ApptCreate(generics.CreateAPIView):
    serializer_class=ApptSerializer
    permission_classes=[IsAuthenticated] 

    def get_queryset(self):
        user = self.request.user
        return Appt.objects.filter(author=user) 
    

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
class ApptDelete(generics.DestroyAPIView):
    serializer_class = ApptSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Appt.objects.filter(author=user)
    
class ApptUpdate(generics.UpdateAPIView):
    serializer_class = ApptSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Appt.objects.filter(author=user)

    def perform_update(self, serializer):
        if serializer.is_valid():
            # You can add any additional logic here before saving the update
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
                
#Notes:
    ''' The permission_classes is used to define who can create a new instance of a class.'''    
    ''' The get_queryset method ensures that users can only see their own appointments.'''
    ''' The perform_create method automatically associates the newly created appointment with the authenticated user.'''
    