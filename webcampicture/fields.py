from django.db.models import ImageField

from . import forms


class WebcamPictureField(ImageField):
    def formfield(self, **kwargs):
        defaults = {"form_class": forms.WebcamPictureFormField}
        defaults.update(kwargs)

        return super().formfield(**defaults)
