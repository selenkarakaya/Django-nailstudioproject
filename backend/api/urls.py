from django.urls import path
from . import views

urlpatterns=[
    path("appointment/",views.ApptCreate.as_view(), name="appointment-create"),
    path("appointment/delete/<int:pk>/",views.ApptDelete.as_view(), name="appointment-delete"),
    path("appointment/update/<int:pk>/",views.ApptUpdate.as_view(), name="appointment-update")
    ]