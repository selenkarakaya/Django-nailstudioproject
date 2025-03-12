'''
Defines the structure of the application's database by creating various models (tables). 
Each model represents a specific entity in the application, such as a user, appointment, feedback, or other related data.
'''

from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

class Appt(models.Model):
    """
    Appointment Model

    This model allows users to book an appointment for a specific service.
    It stores essential appointment details and tracks the associated user.

    Fields:
    -------
    - `service` (CharField): Specifies the name of the service for the appointment. Maximum length is 50 characters.
    - `message` (TextField): An optional message from the user. Maximum length is 200 characters.
    - `appointment_date` (DateTimeField): Stores the date and time of the appointment. Defaults to the current date and time.
    - `status` (CharField): Indicates the status of the appointment. Defaults to 'open'.
    - `created_at` (DateTimeField): Automatically records the appointment creation timestamp.
    - `author` (ForeignKey): Refers to the user who created the appointment. If the user is deleted, the appointment is also removed.

    Methods:
    --------
    - `__str__()`: Returns key appointment details in a readable format for easy display in the admin panel and other views.
    """
    service= models.CharField(max_length=50)
    message=models.TextField(max_length=200,blank=True, null=True)
    appointment_date = models.DateTimeField(default=datetime.datetime.now)
    status = models.CharField(max_length=10, default='open') 
    created_at=models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointment")

    def __str__(self):
        return self.service, self.message, self.author, self.appointment_date, self.status
    

class Feedback(models.Model):
    """
    Feedback Model

    This model is used to store feedback submitted by users. It allows users to leave comments
    and optionally upload images related to their feedback. Each feedback entry is associated with
    a specific user, and the creation timestamp is automatically recorded.

    Fields:
    -------
    - `user` (ForeignKey): A reference to the user who provided the feedback. If the user is deleted, their feedback is also deleted.
    - `comment` (TextField): The comment or text feedback provided by the user.
    - `image` (ImageField): An optional image uploaded by the user. Stored in the 'feedback_images/' directory.
    - `created_at` (DateTimeField): The timestamp of when the feedback was created. Automatically set when the feedback is created.

    Methods:
    --------
    - `__str__()`: Returns a string representation of the feedback, showing the username of the user who provided it and the creation time.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)  #user information
    comment = models.TextField()  #comment from the user
    image = models.ImageField(upload_to='feedback_images/', null=True, blank=True)  #Image from the user
    created_at = models.DateTimeField(auto_now_add=True)  #Creation time
    def __str__(self):
        return f"Feedback from {self.user.username} at {self.created_at}"


