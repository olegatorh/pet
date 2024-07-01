import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "snap.settings")

from django.conf import settings
from djoser.conf import settings as djoser_settings

# Access AUTH_USER_MODEL after settings are configured
AUTH_USER_MODEL = settings.AUTH_USER_MODEL

# Continue with your WSGI application setup
application = get_wsgi_application()

# Print debug information
print("REDIRECT_URLS:", os.getenv('REDIRECT_URLS'))
print("SOCIAL_AUTH_ALLOWED_REDIRECT_URIS:", djoser_settings.SOCIAL_AUTH_ALLOWED_REDIRECT_URIS)