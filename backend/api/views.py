from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics,  serializers 
from .serializers import UserSerializer, ApptSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Appt
from datetime import datetime
from django.core.mail import send_mail
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
        
            if len(serializer.validated_data['service']) < 10:
                raise serializers.ValidationError("Service must be at least 10 characters long.")
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
            # You can add additional logic before saving the update
            # Get the appointment instance being updated
            appt_instance = serializer.instance
            # Optionally, set an updated_at field (but only if it's not auto_now in the model)
            # If 'updated_at' is an auto_now field, Django will handle it automatically
            if not hasattr(appt_instance, 'updated_at') or appt_instance.updated_at is None:
                appt_instance.updated_at = datetime.now()
            
            # Ensure that the user is allowed to update this appointment
            if appt_instance.author != self.request.user:
                raise serializers.ValidationError("You do not have permission to update this appointment.")
            
            # Save the updated appointment
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


#Notes:
    ''' The permission_classes is used to define who can create a new instance of a class.'''    
    ''' The get_queryset method ensures that users can only see their own appointments.'''
    ''' The perform_create method automatically associates the newly created appointment with the authenticated user.'''
    ''' def perform_update(self, serializer):
    if serializer.is_valid():
        appt_instance = serializer.save(author=self.request.user)
        
        # Send an email notification to the user
        send_mail(
            'Your appointment has been updated',
            f'Your appointment for {appt_instance.service} has been successfully updated.',
            'no-reply@example.com',
            [self.request.user.email],
            fail_silently=False,
        )
    else:
        print(serializer.errors)'''