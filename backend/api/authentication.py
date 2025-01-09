from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model




User = get_user_model()

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Token'ı Cookie'den alın
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None  # Token yoksa yetkilendirme yapılmaz

        try:
            # Token doğrulaması
            validated_token = UntypedToken(access_token)
            user_id = validated_token.get("user_id")
            user = User.objects.get(id=user_id)
            return (user, validated_token)
        except (User.DoesNotExist, TokenError, InvalidToken):
            raise AuthenticationFailed("Invalid or expired token.")
