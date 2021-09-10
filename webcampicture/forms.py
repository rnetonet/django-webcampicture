import base64
import uuid

from django.core.files.uploadedfile import SimpleUploadedFile
from django.forms import ImageField

from . import constants, widgets


class WebcamPictureFormField(ImageField):
    widget = widgets.WebcamPictureWidget

    def __init__(self, width=320, height=240, *args, **kwargs):
        self.width = width
        self.height = height
        super().__init__(*args, **kwargs)

    def widget_attrs(self, widget):
        attrs = super().widget_attrs(widget)
        attrs.update({"width": self.width, "height": self.height})
        return attrs

    def to_python(self, value):
        if value:
            random_filename = str(uuid.uuid4()) + constants.WEBCAM_FILENAME_SUFFIX
            decoded_value = base64.b64decode(
                value.replace(constants.WEBCAM_BASE64_PREFIX, "")
            )
            return SimpleUploadedFile(random_filename, decoded_value)
        else:
            return super().to_python(value)
