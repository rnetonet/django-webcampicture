from django.db.models import ImageField

from . import forms


class WebcamPictureField(ImageField):
    def formfield(self, **kwargs):
        kwargs["form_class"] = forms.WebcamPictureFormField
        return super().formfield(**kwargs)
