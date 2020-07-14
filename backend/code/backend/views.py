from django.contrib.auth.models import User, Group
from rest_framework import parsers
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


class HelloView(APIView):
    """
    API endpoint that return received Token only for authenticated users.
    """

    parser_classes = (parsers.JSONParser,)

    def post(self, request, *args, **kwargs):
        token = request.data["token"]
        content = {"message": "Your token is: " + token}
        return Response(content)


class AuthUser(ObtainAuthToken):
    """
    API endpoint that return token for user authentication.
    """

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key,})

