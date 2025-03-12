'''
The views.py file in Django contains the logic to handle HTTP requests and return appropriate responses. 
It defines the behavior for actions like creating, reading, updating, and deleting data, often using Django REST Framework for API endpoints.
'''

from django.contrib.auth.models import User
from rest_framework import generics,  serializers 
from .serializers import UserSerializer, ApptSerializer, LoginSerializer, FeedbackSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Appt,Feedback
from datetime import datetime
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .authentication import CookieJWTAuthentication
from rest_framework.decorators import api_view

@api_view(['GET'])
def verify_token(request):
    # Bu view, HttpOnly cookie'den access token'ı kontrol eder.
    if request.user.is_authenticated:
        return Response({"isAuthenticated": True})
    else:
        return Response({"isAuthenticated": False}, status=401) 
    

class CreateUserView(generics.CreateAPIView):
    """
    View to create a new user.

    This view handles the user registration process. It allows any user to create a new account by submitting
    their information (such as username, email, and password). Upon successful registration, the view generates
    an access token and refresh token for the newly created user, which can be used for authentication in subsequent requests.

    The `CreateUserView` inherits from `CreateAPIView` provided by Django REST Framework, which automatically handles
    the HTTP POST request for creating a new user.

    Attributes:
    -----------
    - `queryset`: Specifies the queryset for the `User` model, which is used for performing database operations.
    - `serializer_class`: Defines the serializer class (`UserSerializer`) to be used for serializing user data.
    - `permission_classes`: The `AllowAny` permission class allows unauthenticated users to access this view (i.e., any user can create a new account).

    Methods:
    --------
    - `perform_create(serializer)`: This method is overridden to save the user data and generate authentication tokens
      after successfully creating a user. It also returns a response containing the user data and the authentication tokens.
    """
    queryset = User.objects.all()  # All user instances are available for the view.
    serializer_class = UserSerializer  # Use UserSerializer to serialize user data.
    permission_classes = [AllowAny]  # Allow any user (authenticated or not) to access this view.


    def perform_create(self, serializer):
        # Save the user object after validating and serializing the data.
        user = serializer.save()

        # Generate a refresh token for the newly created user.
        refresh = RefreshToken.for_user(user)

         # Get the access token from the refresh token.
        access_token = str(refresh.access_token)
        
        # Return the user data, access token, and refresh token in the response.
        return Response({
            'user': UserSerializer(user).data, # Serialized user data
            'access': access_token,
            'refresh': str(refresh)
        })

class LoginView(TokenObtainPairView):
    """
    Handles user login by validating credentials and generating JWT tokens.
    The access and refresh tokens are set as secure HTTP-only cookies in the response.
    """
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
            httponly=True,
            secure=True,
            samesite="Strict",
            max_age=60*60*24
        )

        response.set_cookie(
            'refresh_token',
            refresh_token,
            httponly=True,
            secure=True,
            samesite="Strict",
            max_age=60*60*24
        )
        print(f"Tokens set: access_token={access_token}, refresh_token={refresh_token}")  # Debug log
        return response

class LogoutView(APIView):
    """
    Handles user logout by deleting the access and refresh tokens from cookies.
    Only authenticated users can log out.
    """
    authentication_classes = [CookieJWTAuthentication] 
    permission_classes = [IsAuthenticated]  # Only authenticated users can log out

    def post(self, request):
        response = Response({"message": "Logout successful"}, status=200)
        
        # Clear the cookies
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        return response

class ProfileView(APIView):
    """
    Retrieves and returns the profile information of the currently authenticated user.
    """
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]  #  User authentication
    def get(self, request):
        user = request.user  # We are getting the currently logged-in user.
        user_data = {
            'email': user.email,
            'username': user.username,
        }
        return Response(user_data) 
 

class ApptCreate(generics.CreateAPIView):
    """
    Handles the creation of appointments for authenticated users.
    It ensures that the service message is no more than 100 characters long.
    """
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
                raise serializers.ValidationError("Message must be no more than 100 characters long.")
            serializer.save(author=self.request.user)
        else:
            print("Serializer Errors:", serializer.errors) 
            raise serializers.ValidationError(serializer.errors)
    
class ApptDelete(generics.DestroyAPIView):
    """
    Handles the deletion of appointments for authenticated users.
    Only the user who created the appointment can delete it.
    """
    serializer_class = ApptSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Appt.objects.filter(author=user)
    
class ApptUpdate(generics.UpdateAPIView):
    """
    Handles updating appointments for authenticated users.
    Ensures only the creator of the appointment can update it.
    """

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
    """
    Retrieves the details of an appointment for the authenticated user.
    Ensures that only the user's own appointments can be fetched.
    This view is used to retrieve a single appointment based on the provided primary key (ID).
    """
    queryset = Appt.objects.all()
    serializer_class = ApptSerializer
    permission_classes = [IsAuthenticated]
    
    # This will ensure the appointment is fetched for the authenticated user
    def get_queryset(self):
        return Appt.objects.filter(author=self.request.user)

class ApptListView(generics.ListAPIView):
    """
    Lists all appointments for the authenticated user.
    Ensures that only the user's own appointments are displayed.
    This view is used to list all appointments for the authenticated user.
    """
    serializer_class = ApptSerializer
    permission_classes = [IsAuthenticated] 
    authentication_classes = [CookieJWTAuthentication] 

    def get_queryset(self):
       # Returns the user's own appointments.
        user = self.request.user
        return Appt.objects.filter(author=user)    


class FeedbackCreate(generics.CreateAPIView):
    """
    Allows authenticated users to create feedback.
    The feedback is saved with the current authenticated user.
    """

    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FeedbackListView(generics.ListAPIView):

    """
    Lists all feedback. Accessible by all users without authentication.
    """

    serializer_class = FeedbackSerializer
    permission_classes = [AllowAny]  #Everyone can access it, no verification is required.
  
    def get_queryset(self):        
        return Feedback.objects.all()

    
class FeedbackDelete(generics.DestroyAPIView):

    """
    Allows authenticated users to delete their own feedback.
    Only the user who created the feedback can delete it.
    """
    
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Feedback.objects.filter(user=user)

