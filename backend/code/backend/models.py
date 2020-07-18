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
    # avatar = models.ImageField(blank=True, default='avatar/default.png', upload_to='avatar/')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    birth_date = models.DateField(null=True, blank=True)
    position = models.CharField(null=True, max_length=50, blank=True)
    sex = models.CharField(null=True, max_length=1, choices=SEX_CHOICES, blank=True)
    qualification = models.CharField(null=True, max_length=100, blank=True)

    def __str__(self):  # __unicode__ for Python 2
        return self.user.username


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
