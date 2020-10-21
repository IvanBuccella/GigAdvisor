from autoslug import AutoSlugField
from backend.utils import user_avatar_folder, platform_logo_folder
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    SEX_CHOICES = (
        ("M", "Male"),
        ("F", "Female"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = models.ImageField(
        blank=True, default="/users/default.png", upload_to=user_avatar_folder
    )
    birth_date = models.DateField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=False, default=0)
    longitude = models.FloatField(null=True, blank=False, default=0)
    sex = models.CharField(null=True, max_length=1, choices=SEX_CHOICES, blank=True)
    qualification = models.CharField(null=True, max_length=100, blank=True)
    address = models.CharField(null=True, max_length=100, blank=True)

    def __str__(self):  # __unicode__ for Python 2
        return self.user.username


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


class Category(models.Model):
    name = models.CharField(null=False, max_length=200, blank=True)
    slug = AutoSlugField(populate_from="name", blank=True, unique=True)

    def __str__(self):
        return self.name


class Platform(models.Model):
    name = models.CharField(null=False, max_length=200, blank=True)
    slug = AutoSlugField(populate_from="name", blank=True, unique=True)
    logo = models.ImageField(
        blank=True, default="/platforms/default.png", upload_to=platform_logo_folder
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Field(models.Model):
    name = models.CharField(null=False, max_length=200, blank=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    name = models.CharField(null=False, max_length=200, blank=True)
    text = models.TextField(null=False, blank=True)
    date = models.DateTimeField("date published", auto_now=True)
    latitude = models.FloatField(null=True, blank=False, default=0)
    longitude = models.FloatField(null=True, blank=False, default=0)
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ReviewField(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    field = models.ForeignKey(Field, on_delete=models.CASCADE)
    value = models.IntegerField(null=False, blank=False, default=0)

    def __str__(self):
        return str(self.review) + " - " + str(self.field)


class Topic(models.Model):
    title = models.CharField(null=False, max_length=200, blank=True)
    slug = AutoSlugField(populate_from="title", blank=True, unique=True)
    date = models.DateTimeField("date published", auto_now=True)

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Comment(models.Model):
    text = models.TextField(null=False)
    date = models.DateTimeField("date published", auto_now=True)

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.topic) + " - " + self.text
