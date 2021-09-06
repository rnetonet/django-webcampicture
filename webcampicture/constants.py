from django.conf import settings

WEBCAM_BASE64_PREFIX = getattr(settings, "WEBCAM_BASE64_PREFIX", "data:image/png;base64,")
WEBCAM_CONTENT_TYPE = getattr(settings, "WEBCAM_CONTENT_TYPE", "image/png")
WEBCAM_FILENAME_SUFFIX = getattr(settings, "WEBCAM_FILENAME_SUFFIX", ".png")