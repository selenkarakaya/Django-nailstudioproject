from rest_framework_simplejwt.exceptions import TokenError, InvalidToken 
from rest_framework.authentication import BaseAuthentication 
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken  

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Get the token from the cookie.
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None  # If there is no token, do nothing.

        try:
            # Validate the token.
            validated_token = AccessToken(access_token)  # We are performing authentication with the AccessToken.
            user_id = validated_token.get("user_id")  #  Get the user_id from the token.

            # Get the user
            user = User.objects.get(id=user_id)

            return (user, validated_token)

        except (User.DoesNotExist, TokenError, InvalidToken) as e:
            # If the token is invalid or the user cannot be found.
            raise AuthenticationFailed("Invalid or expired token.") from e

