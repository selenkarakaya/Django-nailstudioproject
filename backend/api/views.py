from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics,  serializers 
from .serializers import UserSerializer, ApptSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Appt,Feedback
from datetime import datetime
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LoginSerializer, FeedbackSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from .authentication import CookieJWTAuthentication
from django.utils import timezone
from rest_framework.parsers import MultiPartParser, FormParser


# Token'ı HTTP-only cookie'ye koyuyoruz
def set_cookie(response, token):
    response.set_cookie(
        'access_token',
        token,
        httponly=True,
        secure=True,  # Güvenli bağlantı (https) ile erişilebilmesini sağlıyoruz
        samesite='Strict',
        max_age=60*60*24  # 1 gün süreyle geçerli
    )
# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        return Response({
            'user': UserSerializer(user).data,
            'access': access_token,
            'refresh': str(refresh)
        })

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        access_token = response.data.get('access')
        refresh_token = response.data.get('refresh')
        
        if not access_token or not refresh_token:
            print(f"Token generation failed: access={access_token}, refresh={refresh_token}")
            return Response({"error": "Token generation failed"}, status=400)

        response.set_cookie(
            key='access_token',
            value= access_token,
            httponly=False,
            secure=True,
            samesite=None,
            max_age=60*60*24
        )

        response.set_cookie(
            'refresh_token',
            refresh_token,
            httponly=False,
            secure=True,
            samesite=None,
            max_age=60*60*24
        )

        return response

class LogoutView(APIView):
    authentication_classes = [CookieJWTAuthentication] 
    permission_classes = [IsAuthenticated]  # Sadece kimliği doğrulanmış kullanıcılar çıkış yapabilir

    def post(self, request):
        # Kullanıcıyı çıkış yaptırmak için cookie'leri temizle
        response = Response({"message": "Logout successful"}, status=200)
        
        # Cookie'leri temizleyin
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        return response

class ProfileView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]  # Kullanıcı doğrulaması yapılacak
    def get(self, request):
        user = request.user  # Şu anda oturum açmış kullanıcıyı alıyoruz
        user_data = {
            'email': user.email,
            'username': user.username,
            # Diğer profil bilgilerini buraya ekleyebilirsiniz
        }
        return Response(user_data) 
 
    
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
    authentication_classes = [CookieJWTAuthentication]

    def get_queryset(self):
        user = self.request.user
        return Appt.objects.filter(author=user) 
    
    def perform_create(self, serializer):
        if serializer.is_valid():      
            serializer.save(author=self.request.user)
            if len(serializer.validated_data['message']) > 100:
                raise serializers.ValidationError("Service must be at least 10 characters long.")
            serializer.save(author=self.request.user)
        else:
            print("Serializer Errors:", serializer.errors)  # Hataları yazdır
            raise serializers.ValidationError(serializer.errors)
    
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

class ApptRetrieve(generics.RetrieveAPIView):
    queryset = Appt.objects.all()
    serializer_class = ApptSerializer
    permission_classes = [IsAuthenticated]
    
    # This will ensure the appointment is fetched for the authenticated user
    def get_queryset(self):
        return Appt.objects.filter(author=self.request.user)
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
class ApptListView(generics.ListAPIView):
    serializer_class = ApptSerializer
    permission_classes = [IsAuthenticated]  # Kullanıcının kimliği doğrulanmalı
    authentication_classes = [CookieJWTAuthentication]  # CookieJWT doğrulaması

    def get_queryset(self):
        """
        Kullanıcının kendi randevularını döndürür.
        """
        user = self.request.user
        return Appt.objects.filter(author=user)    

    
class FeedbackView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()  # Gelen isteği düzenlemek için bir kopya oluştur
        data['user'] = request.user.id  # Oturum açmış kullanıcının ID'sini ekle
        serializer = FeedbackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)  
    

class FeedbackListView(generics.ListAPIView):
    """
    Tüm kullanıcıların tüm feedback'leri görebileceği bir listeleme API'si.
    """
    serializer_class = FeedbackSerializer
    permission_classes = [AllowAny]  # Herkes erişebilir, doğrulama gerekmez.

    def get_queryset(self):
        """
        Tüm feedback'leri döndür.
        """
        return Feedback.objects.all()    