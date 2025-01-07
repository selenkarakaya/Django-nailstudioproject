from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Appt

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
        

class ApptSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appt
        fields=["id", "service", "message","created_at", "author"]
        extra_kwargs ={" author":{"read_only":True}} 


'''

extra_kwargs = {"author": {"read_only": True}}:

This is an additional configuration for the serializer fields. It indicates that the author field should be read-only, meaning it cannot be modified or written to when creating or updating an Appt instance via the API.
read_only=True: This ensures that the author field will be included in the serialized data (for example, in GET requests), but it won't be accepted in POST or PUT requests to create or update Appt instances.


'''        