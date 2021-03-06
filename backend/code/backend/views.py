from django.contrib.auth.models import User, Group
from rest_framework import parsers
from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from backend.serializers import (
    UserSerializer,
    ProfileSerializer,
    CategorySerializer,
    PlatformSerializer,
    FieldSerializer,
    ReviewSerializer,
    ReviewFieldSerializer,
    TopicSerializerGet,
    TopicSerializerSet,
    CommentSerializerGet,
    CommentSerializerSet,
)
from backend.models import (
    Profile,
    Category,
    Platform,
    Review,
    Field,
    ReviewField,
    Topic,
    Comment,
)
from rest_framework import generics
from .utils import transform_base64_into_avatar, decimal_format, is_integer
from django.db.models import F, Count, Sum


def json_response(dataToReturn):
    if dataToReturn == []:
        return JsonResponse(dataToReturn, status=400, safe=False)
    return JsonResponse(dataToReturn, status=201, safe=False)


class UserAuth(ObtainAuthToken):
    # API endpoint that return token for user authentication.

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({"token": token.key}, status=201)


class UserCreate(APIView):
    # API endpoint that create a new Profile.

    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class UserProfile(APIView):
    # API endpoint that return a Profile.

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        profile = Profile.objects.get(user=user)
        profileSerializer = ProfileSerializer(profile)

        retDict = {}
        retDict.update({"first_name": user.first_name})
        retDict.update({"last_name": user.last_name})
        retDict.update({"email": user.email})
        retDict.update({"username": user.username})
        retDict.update({"avatar": profileSerializer.data["avatar"]})
        retDict.update({"birth_date": profileSerializer.data["birth_date"]})
        retDict.update({"latitude": profileSerializer.data["latitude"]})
        retDict.update({"longitude": profileSerializer.data["longitude"]})
        retDict.update({"sex": profileSerializer.data["sex"]})
        retDict.update({"qualification": profileSerializer.data["qualification"]})
        retDict.update({"address": profileSerializer.data["address"]})

        return JsonResponse(retDict, status=201)


class UserProfileUpdate(APIView):
    # API endpoint that update a Profile.

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        dataToUpdate = {
            "first_name": request.data["firstName"],
            "last_name": request.data["lastName"],
            "email": request.data["email"],
        }
        userSerializer = UserSerializer(user, data=dataToUpdate, partial=True)
        if userSerializer.is_valid():
            userSerializer.save()
            dataToUpdate = {
                "birth_date": request.data["birthDate"],
                "latitude": request.data["latitude"],
                "longitude": request.data["longitude"],
                "sex": request.data["sex"],
                "qualification": request.data["qualification"],
                "address": request.data["address"],
            }
            profileSerializer = ProfileSerializer(
                user.profile, data=dataToUpdate, partial=True
            )
            if profileSerializer.is_valid():
                profileSerializer.save()
                return JsonResponse(profileSerializer.data, status=201)
            return JsonResponse(profileSerializer.errors, status=400)
        return JsonResponse(userSerializer.errors, status=400)


class UserPasswordUpdate(APIView):
    # API endpoint that update a Profile Password.

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        dataToUpdate = {
            "password": request.data["password"],
        }
        userSerializer = UserSerializer(user, data=dataToUpdate, partial=True)
        if userSerializer.is_valid():
            userSerializer.save()
            return JsonResponse(userSerializer.data, status=201)
        return JsonResponse(userSerializer.errors, status=400)


class UserAvatarUpdate(APIView):
    # API endpoint that update a Profile Avatar.

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        dataToUpdate = {
            "avatar": transform_base64_into_avatar(
                request.data["avatar"], request.data["format"]
            )[0],
        }
        profileSerializer = ProfileSerializer(
            user.profile,
            dataToUpdate,
            partial=True,
        )
        if profileSerializer.is_valid():
            profileSerializer.save()
            return JsonResponse(profileSerializer.data, status=201)
        return JsonResponse("Error", status=400)


class Categories(APIView):
    # API endpoint that return Categories.
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        queryset = Category.objects.all()
        categorySerializer = CategorySerializer(queryset, many=True)
        return JsonResponse(categorySerializer.data, status=201, safe=False)


def get_platform_data_with_ratings(platform, withFields):
    values = (
        ReviewField.objects.filter(
            review__in=Review.objects.filter(platform=platform["id"]),
        )
        .values("field")
        .annotate(sum=Sum("value"), number=Count("value"))
    )
    if values.count():
        fields = []
        valuesSum = 0
        valuesNumber = 0

        if withFields:
            allFields = Field.objects.all()
        for value in values:
            valuesSum = valuesSum + value["sum"]
            valuesNumber = valuesNumber + value["number"]
            if withFields:
                fields.append(
                    {
                        "id": value["field"],
                        "name": allFields[value["field"] - 1].name,
                        "avg": decimal_format(value["sum"] / value["number"]),
                    }
                )
        platform["avg"] = decimal_format(valuesSum / valuesNumber)
        if withFields:
            platform["fields"] = fields
    else:
        platform["avg"] = 0
        platform["fields"] = []
    return platform


class Platforms(APIView):
    # API endpoint that return Platforms or a specific Platform.
    def get(self, request, *args, **kwargs):
        if request.GET and "slug" in request.GET:
            request.data["slug"] = request.GET["slug"]
        return self.post(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        dataToReturn = []
        if request.data and "slug" in request.data and request.data["slug"] is not "":
            querysetPlatform = Platform.objects.filter(slug=request.data["slug"])
            platformSerializer = PlatformSerializer(querysetPlatform, many=True)
            for platform in platformSerializer.data:
                dataToReturn = get_platform_data_with_ratings(platform, 1)
        else:
            querysetPlatform = Platform.objects.all()
            platformSerializer = PlatformSerializer(querysetPlatform, many=True)
            dataToReturn = platformSerializer.data
        return json_response(dataToReturn)


class Reviews(APIView):
    # API endpoint that return Platform's Reviews.
    def get(self, request, *args, **kwargs):
        if request.GET and "slug" in request.GET and "withAvg" in request.GET:
            request.data["slug"] = request.GET["slug"]
            request.data["withAvg"] = request.GET["withAvg"]
        return self.post(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if (
            request.data
            and "slug" in request.data
            and "withAvg" in request.data
            and request.data["slug"] is not ""
            and is_integer(request.data["withAvg"])
        ):
            querysetReview = Review.objects.filter(
                platform=Platform.objects.get(slug=request.data["slug"])
            ).order_by(F("date").desc())
            reviewSerializer = ReviewSerializer(querysetReview, many=True)

            if int(request.data["withAvg"]) == 1:
                for review in reviewSerializer.data:
                    reviewValue = (
                        ReviewField.objects.filter(review=review["id"])
                        .values("review")
                        .annotate(sum=Sum("value"), number=Count("value"))
                    )
                    review["avg"] = reviewValue[0]["sum"] / reviewValue[0]["number"]

            return JsonResponse(reviewSerializer.data, status=201, safe=False)
        else:
            return JsonResponse({}, status=400, safe=False)


class ReviewCreate(APIView):
    # API endpoint that create a new Review (with annex ReviewFields instances).

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        if (
            request.data
            and "name" in request.data
            and request.data["name"] is not ""
            and "text" in request.data
            and request.data["text"] is not ""
            and "latitude" in request.data
            and request.data["latitude"] is not ""
            and "longitude" in request.data
            and request.data["longitude"] is not ""
            and "region" in request.data
            and is_integer(request.data["platform"])
            and int(request.data["platform"]) > 0
            and "fieldIds" in request.data
            and "fieldValues" in request.data
        ):
            data = {
                "name": request.data["name"],
                "text": request.data["text"],
                "latitude": request.data["latitude"],
                "longitude": request.data["longitude"],
                "region": request.data["region"],
                "platform": request.data["platform"],
                "profile": request.user.id,
            }
            reviewSerializer = ReviewSerializer(data=data)
            if reviewSerializer.is_valid():
                review = reviewSerializer.save()
                error = ""
                fieldIds = request.data["fieldIds"]
                fieldValues = request.data["fieldValues"]
                for i in range(len(fieldIds)):
                    if int(fieldValues[i]) > 0:
                        data = {
                            "field": fieldIds[i],
                            "review": reviewSerializer.data["id"],
                            "value": fieldValues[i],
                        }
                        reviewFieldSerializer = ReviewFieldSerializer(data=data)
                        if reviewFieldSerializer.is_valid():
                            reviewFieldSerializer.save()
                        else:
                            error = reviewFieldSerializer.errors
                    else:
                        error = "Fields Error"
                if len(fieldIds) == 0:
                    error = "No Fields Received"
                if error:
                    instance = Review.objects.get(id=reviewSerializer.data["id"])
                    instance.delete()
                    return JsonResponse(error, status=400, safe=False)
                return JsonResponse("OK", status=201, safe=False)
            return JsonResponse(reviewSerializer.errors, status=400, safe=False)
        else:
            return JsonResponse({}, status=400, safe=False)


class PlatformsRating(APIView):
    # API endpoint that return all Platforms' Rating.
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        querysetPlatform = Platform.objects.all()
        platformSerializer = PlatformSerializer(querysetPlatform, many=True)
        dataToReturn = []
        for platform in platformSerializer.data:
            dataToReturn.append(get_platform_data_with_ratings(platform, 0))
        return json_response(dataToReturn)


def get_platform_data_with_ratings_by_field(field):
    dataToReturn = []
    querysetPlatform = Platform.objects.all()
    platformSerializer = PlatformSerializer(querysetPlatform, many=True)
    for platform in platformSerializer.data:
        values = (
            ReviewField.objects.filter(
                review__in=Review.objects.filter(platform=platform["id"]),
                field=field["id"],
            )
            .values("field")
            .annotate(sum=Sum("value"), number=Count("value"))
        )
        if values.count():
            avg = decimal_format(values[0]["sum"] / values[0]["number"])
            dataToReturn.append({"name": platform["name"], "avg": avg})
        else:
            dataToReturn.append({"name": platform["name"], "avg": 0})
    return dataToReturn


class FieldsRating(APIView):
    # API endpoint that return all Fields' Rating.
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        querysetField = Field.objects.all()
        fieldSerializer = FieldSerializer(querysetField, many=True)
        dataToReturn = []
        for field in fieldSerializer.data:
            dataToReturn.append(
                {
                    "name": field["name"],
                    "values": get_platform_data_with_ratings_by_field(field),
                }
            )
        return json_response(dataToReturn)


class Fields(APIView):
    # API endpoint that return all Fields.
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        querysetField = Field.objects.all()
        fieldSerializer = FieldSerializer(querysetField, many=True)
        return JsonResponse(fieldSerializer.data, status=201, safe=False)


class Topics(APIView):
    # API endpoint that return Topics or a specific Topic

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        dataToReturn = []
        if request.data and "slug" in request.data and "category" in request.data:
            if request.data["slug"] is not "":
                querysetTopic = Topic.objects.filter(slug=request.data["slug"])
                topicSerializer = TopicSerializerGet(querysetTopic, many=True)
                if querysetTopic.count() > 0:
                    comments = (
                        Comment.objects.filter(
                            topic=topicSerializer.data[0]["id"],
                        )
                        .values("topic")
                        .annotate(number=Count("id"))
                    )
                    dataToReturn = {
                        "id": topicSerializer.data[0]["id"],
                        "title": topicSerializer.data[0]["title"],
                        "slug": topicSerializer.data[0]["slug"],
                        "date": topicSerializer.data[0]["date"],
                        "category": topicSerializer.data[0]["category"],
                        "count": comments[0]["number"],
                    }
            elif request.data["category"] is not "":
                querysetTopic = Topic.objects.filter(
                    category=Category.objects.get(slug=request.data["category"])
                ).order_by(F("date").desc())
                topicSerializer = TopicSerializerGet(querysetTopic, many=True)
                for topic in topicSerializer.data:
                    comments = (
                        Comment.objects.filter(
                            topic=topic["id"],
                        )
                        .values("topic")
                        .annotate(number=Count("id"))
                    )
                    dataToReturn.append(
                        {
                            "title": topic["title"],
                            "slug": topic["slug"],
                            "date": topic["date"],
                            "category": topic["category"],
                            "count": comments[0]["number"],
                        }
                    )
        else:
            querysetTopic = Topic.objects.all().order_by(F("date").desc())
            topicSerializer = TopicSerializerGet(querysetTopic, many=True)
            for topic in topicSerializer.data:
                comments = (
                    Comment.objects.filter(
                        topic=topic["id"],
                    )
                    .values("topic")
                    .annotate(number=Count("id"))
                )
                dataToReturn.append(
                    {
                        "title": topic["title"],
                        "slug": topic["slug"],
                        "date": topic["date"],
                        "category": topic["category"],
                        "count": comments[0]["number"],
                    }
                )
        return json_response(dataToReturn)


class TopicCreate(APIView):
    # API endpoint that create a new Topic (with annex Comment instance).

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        if (
            request.data
            and "title" in request.data
            and "category" in request.data
            and "text" in request.data
            and is_integer(request.data["category"])
            and int(request.data["category"]) > 0
        ):
            data = {
                "title": request.data["title"],
                "category": request.data["category"],
                "profile": request.user.id,
            }
            topicSerializer = TopicSerializerSet(data=data)
            if topicSerializer.is_valid():
                topic = topicSerializer.save()
                data = {
                    "text": request.data["text"],
                    "topic": topicSerializer.data["id"],
                    "profile": request.user.id,
                }
                commentSerializer = CommentSerializerSet(data=data)
                if commentSerializer.is_valid():
                    commentSerializer.save()
                else:
                    instance = Topic.objects.get(id=topicSerializer.data["id"])
                    instance.delete()
                    return JsonResponse(
                        commentSerializer.errors, status=400, safe=False
                    )
                return JsonResponse("OK", status=201, safe=False)
            return JsonResponse(topicSerializer.errors, status=400, safe=False)
        else:
            return JsonResponse({}, status=400, safe=False)


class Comments(APIView):
    # API endpoint that return Comments of a specific Topic.

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        dataToReturn = []
        if (
            request.data
            and "id" in request.data
            and is_integer(request.data["id"])
            and int(request.data["id"]) > 0
        ):
            querysetComment = Comment.objects.filter(
                topic=int(request.data["id"])
            ).order_by(F("date").asc())
            commentSerializer = CommentSerializerGet(querysetComment, many=True)
            for comment in commentSerializer.data:
                dataToReturn.append(
                    {
                        "text": comment["text"],
                        "date": comment["date"],
                        "user": {
                            "username": comment["profile"]["user"]["username"],
                            "avatar": comment["profile"]["avatar"],
                        },
                    }
                )
        return json_response(dataToReturn)


class CommentCreate(APIView):
    # API endpoint that create a new Comment for a specific Topic.

    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        if (
            request.data
            and "text" in request.data
            and "topic" in request.data
            and is_integer(request.data["topic"])
            and int(request.data["topic"]) > 0
        ):
            data = {
                "text": request.data["text"],
                "topic": request.data["topic"],
                "profile": request.user.id,
            }
            commentSerializer = CommentSerializerSet(data=data)
            if commentSerializer.is_valid():
                commentSerializer.save()
                return JsonResponse("OK", status=201, safe=False)
            else:
                return JsonResponse(commentSerializer.errors, status=400, safe=False)
        else:
            return JsonResponse({}, status=400, safe=False)


class PlatformTrend(APIView):
    # API endpoint that return Platform trend
    def get(self, request, *args, **kwargs):
        if request.GET and "slug" in request.GET:
            request.data["slug"] = request.GET["slug"]
        return self.post(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        dataToReturn = []
        if request.data and "slug" in request.data and request.data["slug"] is not "":
            querysetPlatform = Platform.objects.filter(slug=request.data["slug"])
            platformSerializer = PlatformSerializer(querysetPlatform, many=True)
            for platform in platformSerializer.data:
                # Values per region
                regions = []
                reviewsRegions = (
                    Review.objects.filter(platform=platform["id"])
                    .values("region")
                    .distinct()
                )
                for region in reviewsRegions:
                    if region["region"] is not "":
                        values = (
                            ReviewField.objects.filter(
                                review__in=Review.objects.filter(
                                    region=region["region"]
                                ),
                            )
                            .values("review")
                            .annotate(sum=Sum("value"), number=Count("value"))
                        )
                        regionReviewsValue = 0
                        regionReviewsNumber = 0
                        regionReviewsAvg = 0
                        for value in values:
                            regionReviewsValue = regionReviewsValue + int(value["sum"])
                            regionReviewsNumber = regionReviewsNumber + int(
                                value["number"]
                            )
                        if regionReviewsValue > 0:
                            regionReviewsAvg = decimal_format(
                                regionReviewsValue / regionReviewsNumber
                            )
                        regions.append(
                            {
                                "name": region["region"],
                                "avg": regionReviewsAvg,
                            }
                        )

                # Values per Field
                querysetField = Field.objects.all()
                fieldSerializer = FieldSerializer(querysetField, many=True)
                fields = []
                for field in fieldSerializer.data:
                    querySetReviewField = ReviewField.objects.filter(
                        review__in=Review.objects.filter(
                            platform=platform["id"]
                        ).order_by(F("date").asc()),
                        field=field["id"],
                    )
                    reviewFields = ReviewFieldSerializer(querySetReviewField, many=True)
                    fieldValues = []
                    i = 1
                    for reviewField in reviewFields.data:
                        fieldValues.append({"time": i, "value": reviewField["value"]})
                        i = i + 1
                    fields.append(
                        {
                            "name": field["name"],
                            "color": field["color"],
                            "values": fieldValues,
                        }
                    )
                dataToReturn = {
                    "name": platform["name"],
                    "fields": fields,
                    "regions": regions,
                }

        return json_response(dataToReturn)