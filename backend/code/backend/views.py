from django.contrib.auth.models import User, Group
from rest_framework import parsers
from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from backend.serializers import UserSerializer, ProfileSerializer
from backend.models import Profile
from rest_framework import generics


class HelloView(APIView):
    """
    API endpoint that return received Token only for authenticated users.
    """

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

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
        return JsonResponse({"token": token.key}, status=201)


class UserCreate(APIView):
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class UserProfile(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        token = request.data["token"]
        user = Token.objects.get(key=token).user
        profile = Profile.objects.get(user=user)
        profileSerializer = ProfileSerializer(profile)

        retDict = {}
        retDict.update({"first_name": user.first_name})
        retDict.update({"last_name": user.last_name})
        retDict.update({"email": user.email})
        retDict.update({"username": user.username})
        retDict.update({"birth_date": profileSerializer.data["birth_date"]})
        retDict.update({"position": profileSerializer.data["position"]})
        retDict.update({"sex": profileSerializer.data["sex"]})
        retDict.update({"qualification": profileSerializer.data["qualification"]})

        return JsonResponse(retDict, status=201)


class UserUpdate(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        token = request.data["token"]
        user = Token.objects.get(key=token).user
        dataToUpdate = {
            "first_name": request.data["firstName"],
            "last_name": request.data["lastName"],
            "email": request.data["email"],
            "password": request.data["password"],
        }
        userSerializer = UserSerializer(user, data=dataToUpdate, partial=True)
        if userSerializer.is_valid():
            userSerializer.save()
            dataToUpdate = {
                "birth_date": request.data["birthDate"],
                "position": request.data["position"],
                "sex": request.data["sex"],
                "qualification": request.data["qualification"],
            }
            profileSerializer = ProfileSerializer(
                user.profile, data=dataToUpdate, partial=True
            )
            if profileSerializer.is_valid():
                profileSerializer.save()
                return JsonResponse({"message": "ok"}, status=201)
            return JsonResponse(profileSerializer.errors, status=400)
        return JsonResponse(userSerializer.errors, status=400)

        """
        retDict = {}
        retDict.update({"first_name": user.first_name})
        retDict.update({"last_name": user.last_name})
        retDict.update({"email": user.email})
        retDict.update({"username": user.username})
        retDict.update({"birth_date": profileSerializer.data["birth_date"]})
        retDict.update({"position": profileSerializer.data["position"]})
        retDict.update({"sex": profileSerializer.data["sex"]})
        retDict.update({"qualification": profileSerializer.data["qualification"]})
        """

