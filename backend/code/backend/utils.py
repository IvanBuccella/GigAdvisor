import os
import base64, secrets, io
from PIL import Image
from django.core.files.base import ContentFile


def decimal_format(number):
    return "{:.2f}".format(round(number, 2))


def is_integer(n):
    try:
        float(n)
    except ValueError:
        return False
    else:
        return float(n).is_integer()


def user_avatar_folder(instance, filename):
    base, extension = os.path.splitext(filename.lower())
    return f"users/{instance.pk}/{filename.lower()}"


def platform_logo_folder(instance, filename):
    base, extension = os.path.splitext(filename.lower())
    return f"platforms/{instance.pk}/{filename.lower()}"


def transform_base64_into_avatar(_dataurl, _format):
    # file name and extension
    _filename, _extension = secrets.token_hex(20), _format.split("/")[-1]

    # generating the contents of the file
    file = ContentFile(base64.b64decode(_dataurl), name=f"{_filename}.{_extension}")

    # file and filename
    return file, (_filename, _extension)
