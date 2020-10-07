from django.contrib.auth.models import User
from rest_framework import serializers
from backend.models import Profile


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "email",
            "username",
            "password",
        )

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.email = validated_data.get("email", instance.email)
        if validated_data.get("password"):
            instance.set_password(validated_data.get("password"))
        instance.save()
        return instance


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Profile
        fields = ("user", "birth_date", "position", "sex", "qualification", "avatar")

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        profile, created = Profile.objects.update_or_create(
            user=user,
            birth_date=validated_data.pop("birth_date"),
            position=validated_data.pop("position"),
            sex=validated_data.pop("sex"),
            qualification=validated_data.pop("qualification"),
        )
        return profile

    def update(self, instance, validated_data):
        instance.birth_date = validated_data.get("birth_date", instance.birth_date)
        instance.position = validated_data.get("position", instance.position)
        instance.sex = validated_data.get("sex", instance.sex)
        instance.qualification = validated_data.get(
            "qualification", instance.qualification
        )
        if validated_data.get("avatar"):
            instance.avatar = validated_data.get("avatar", instance.avatar)
        instance.save()
        return instance
