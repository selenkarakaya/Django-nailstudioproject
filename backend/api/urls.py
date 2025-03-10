from django.urls import path
from . import views

urlpatterns=[
    path("appointments/",views.ApptListView.as_view(), name="appointment-list"),
    path("appointment/create/",views.ApptCreate.as_view(), name="appointment-create"),
    path("appointment/delete/<int:pk>/",views.ApptDelete.as_view(), name="appointment-delete"),
    path('appointment/<int:pk>/', views.ApptRetrieve.as_view(), name='appointment-detail'),
    path("appointment/update/<int:pk>/",views.ApptUpdate.as_view(), name="appointment-update"),
    path("appointment/feedback/", views.FeedbackCreate.as_view(), name='feedback-create'),
    path("appointment/feedbacks/",views.FeedbackListView.as_view(), name="feedback-list"),
    path('appointment/feedback/<int:pk>/', views.FeedbackRetrieve.as_view(), name='feedback-detail'),
    path("appointment/feedback/delete/<int:pk>/",views.FeedbackDelete.as_view(), name="feedback-delete"),
    ]


