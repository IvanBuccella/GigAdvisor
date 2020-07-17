from django.contrib.auth.models import User, Group
from rest_framework import parsers
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from backend.serializers import UserSerializer


class HelloView(APIView):
    """
    API endpoint that return received Token only for authenticated users.
    """

    permission_classes = [IsAuthenticated]
    parser_classes = (parsers.JSONParser,)

    def post(self, request, *args, **kwargs):
        token = request.data["token"]
        content = {"message": "Your token is: " + token}
        return JsonResponse(content, status=201)


class UserAuth(ObtainAuthToken):
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
        return JsonResponse({"token": token.key,}, status=201)


class UserCreate(APIView):
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
