from django.contrib import admin
from django.urls import path,include
from api.views import CreateUserView, LoginView ,ProfileView,LogoutView,verify_token
from rest_framework_simplejwt.views import  TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Welcome to the API!"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/login/",LoginView.as_view(), name="login"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('api/token/verify/', verify_token, name='verify_token'),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
    path('api/profile/', ProfileView.as_view(), name='profile'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('', home),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# when I write the updateUser, i should add it's path here.