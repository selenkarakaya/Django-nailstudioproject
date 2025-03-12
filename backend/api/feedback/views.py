from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Feedback
from datetime import datetime
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import  FeedbackSerializer
from ..authentication  import CookieJWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import render
from rest_framework.decorators import api_view

class FeedbackCreate(generics.CreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FeedbackListView(generics.ListAPIView):
    #A list where all users can see all feedback.

    serializer_class = FeedbackSerializer
    permission_classes = [AllowAny]  #Everyone can access it, no verification is required.
  
    def get_queryset(self):        
        return Feedback.objects.all()

    
class FeedbackDelete(generics.DestroyAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Feedback.objects.filter(user=user)

