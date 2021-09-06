import base64
import uuid

from django.core.files.uploadedfile import SimpleUploadedFile
from django.forms import ImageField

from . import constants, widgets


class WebcamPictureFormField(ImageField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.widget = widgets.WebcamPictureWidget(attrs={"label": self.label})

    def to_python(self, value):
        if value:
            random_filename = str(uuid.uuid4()) + constants.WEBCAM_FILENAME_SUFFIX
            decoded_value = base64.b64decode(value.replace(constants.WEBCAM_BASE64_PREFIX, ""))
            return SimpleUploadedFile(random_filename, decoded_value)
        else:
            return super().to_python(value)
