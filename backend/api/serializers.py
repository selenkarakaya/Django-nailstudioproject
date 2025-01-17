from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Appt
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            print(f"No user found with email: {email}")
            raise serializers.ValidationError("Invalid credentials")

        if not user.check_password(password):
            print(f"Password mismatch for user: {email}")
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            print(f"User {user.email} is not active")
            raise serializers.ValidationError("Inactive user")
        print(f"User authenticated successfully: {user.email}")
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }

    def get_token(cls, user):
        token = super().get_token(user)
        # İsteğe bağlı özel alanlar
        token['email'] = user.email
        return token





class ApptSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appt
        fields=["id", "service", "message",'appointment_date',"status", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

 

'''

extra_kwargs = {"author": {"read_only": True}}:

This is an additional configuration for the serializer fields. It indicates that the author field should be read-only, meaning it cannot be modified or written to when creating or updating an Appt instance via the API.
read_only=True: This ensures that the author field will be included in the serialized data (for example, in GET requests), but it won't be accepted in POST or PUT requests to create or update Appt instances.


'''        