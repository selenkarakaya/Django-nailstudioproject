from django.urls import path
from . import views
from .views import index


urlpatterns=[
    path("appointment/",views.ApptListView.as_view(), name="appointment-list"),
    path("appointment/create",views.ApptCreate.as_view(), name="appointment-create"),
    path("appointment/delete/<int:pk>",views.ApptDelete.as_view(), name="appointment-delete"),
    path('appointment/<int:pk>/', views.ApptRetrieve.as_view(), name='appointment-detail'),
    path("appointment/update/<int:pk>",views.ApptUpdate.as_view(), name="appointment-update"),
    path("appointment/feedback/", views.FeedbackView.as_view(), name='feedback'),
    path("appointment/feedbacks/",views.FeedbackListView.as_view(), name="feedback-list"),
     path('', index, name='index'),
    ]


