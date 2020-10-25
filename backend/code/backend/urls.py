"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from backend import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user-auth", views.UserAuth.as_view(), name="user-auth"),
    path("user-create", views.UserCreate.as_view(), name="user-create"),
    path("user-profile", views.UserProfile.as_view(), name="user-profile"),
    path(
        "user-profile-update",
        views.UserProfileUpdate.as_view(),
        name="user-profile-update",
    ),
    path(
        "user-password-update",
        views.UserPasswordUpdate.as_view(),
        name="user-password-update",
    ),
    path(
        "user-avatar-update",
        views.UserAvatarUpdate.as_view(),
        name="user-avatar-update",
    ),
    path("categories", views.Categories.as_view(), name="categories"),
    path("platforms", views.Platforms.as_view(), name="platforms"),
    path("reviews", views.Reviews.as_view(), name="reviews"),
    path("review", views.ReviewCreate.as_view(), name="review"),
    path("platforms-rating", views.PlatformsRating.as_view(), name="platforms-rating"),
    path("fields-rating", views.FieldsRating.as_view(), name="fields-rating"),
    path("fields", views.Fields.as_view(), name="fields"),
    path("topics", views.Topics.as_view(), name="topics"),
    path("topic-create", views.TopicCreate.as_view(), name="topic-create"),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
