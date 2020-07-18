from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from backend.models import Profile


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = "Profile"
    fk_name = "user"


class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)
    list_display = (
        "username",
        "first_name",
        "last_name",
        "get_birth_date",
        "get_qualification",
        "get_position",
        "get_sex",
        "email",
        "is_staff",
    )
    list_select_related = ("profile",)

    def get_birth_date(self, instance):
        return instance.profile.birth_date

    get_birth_date.short_description = "Birth Date"

    def get_sex(self, instance):
        return instance.profile.sex

    get_sex.short_description = "Sex"

    def get_qualification(self, instance):
        return instance.profile.qualification

    get_qualification.short_description = "Qualification"

    def get_position(self, instance):
        return instance.profile.position

    get_position.short_description = "Position"

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
