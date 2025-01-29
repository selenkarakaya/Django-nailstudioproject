from rest_framework_simplejwt.exceptions import TokenError, InvalidToken  # Hata sınıfları
from rest_framework.authentication import BaseAuthentication  # BaseAuthentication
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken  # AccessToken kullanıyoruz

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Cookie'den token'ı al
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None  # Token yoksa, hiçbir şey yapılmaz

        try:
            # Token'ı doğrula
            validated_token = AccessToken(access_token)  # AccessToken ile doğrulama yapıyoruz
            user_id = validated_token.get("user_id")  # Token'dan user_id'yi al

            # Kullanıcıyı getirme
            user = User.objects.get(id=user_id)

            return (user, validated_token)

        except (User.DoesNotExist, TokenError, InvalidToken) as e:
            # Eğer token geçersizse ya da kullanıcı bulunamazsa
            raise AuthenticationFailed("Invalid or expired token.") from e

