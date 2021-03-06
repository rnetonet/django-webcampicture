import base64

from django.forms.widgets import Widget

from . import constants


class WebcamPictureWidget(Widget):
    template_name = "webcampicture/webcampicture.html"
    needs_multipart_form = True

    def format_value(self, value):
        # file object
        if value and hasattr(value, "file"):
            file_content = value.file.read()
            file_content_base64 = base64.b64encode(file_content)
            return constants.WEBCAM_BASE64_PREFIX + file_content_base64.decode("utf8")
        # base64 string
        elif value:
            return value
        else:
            super().format_value(value)
