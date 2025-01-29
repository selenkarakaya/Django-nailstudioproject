from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

class Appt(models.Model):
    service= models.CharField(max_length=50)
    message=models.TextField(max_length=200,blank=True, null=True)
    appointment_date = models.DateTimeField(default=datetime.datetime.now)
    status = models.CharField(max_length=10, default='open') 
    created_at=models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointment")

    def __str__(self):
        return self.service, self.message, self.author, self.appointment_date, self.status
    

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  #user information
    comment = models.TextField()  #comment from the user
    image = models.ImageField(upload_to='feedback_images/', null=True, blank=True)  #Image from the user
    created_at = models.DateTimeField(auto_now_add=True)  #Creation time
    def __str__(self):
        return f"Feedback from {self.user.username} at {self.created_at}"


'''
user = User.objects.get(id=1)
appointments = user.appointment.all()  # Access all appointments of the user

models.ForeignKey:
This defines a foreign key relationship, linking the current model to another model (User in this case).

User:
The model being referenced by this foreign key. Typically, User is the built-in Django model used for user authentication.

on_delete=models.CASCADE:
This specifies what should happen when the referenced User is deleted.
models.CASCADE means that if the user is deleted, all associated Appointment (or whatever model this field is part of) instances will also be deleted automatically.

related_name="appointment":
This defines the reverse relationship from the User model to the model containing this foreign key.

You can use user.appointment to access all Appointment instances that are related to a specific user. If the related_name is not provided, Django automatically uses the lowercase model name as the reverse relationship (e.g., appointment_set).


In Django, the __str__ method is used to represent an instance of a model as a string. This means that when the model instance is printed using print() or displayed in the Django admin interface, the string returned by __str__ will be shown. The purpose of this method is to provide a human-readable representation of the model instance.

For example, in the case of an Appt model, you might want to display the service name, the user who created the appointment, and the creation date in a clear and readable format. The __str__ method ensures that whenever an Appt instance is printed or displayed, this meaningful string representation will be used.

'''    