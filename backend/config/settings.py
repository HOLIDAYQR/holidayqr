from pathlib import Path
import os
from corsheaders.defaults import default_headers  # ✅ Required for custom CORS headers

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure--)b-(^56yrp((#um+ltr7k5gi@o&n%4vqixrb=8)0u*y9t4lc-'

DEBUG = False  # ⚠️ Always keep False in production

ALLOWED_HOSTS = ['holidayqr-backend.onrender.com', 'www.holidayqr.com', 'localhost', '127.0.0.1']

# ✅ Installed Apps
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'core',
    'whitenoise.runserver_nostatic',  # ✅ For serving static files
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# ✅ Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ✅ SQLite Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ✅ Password Validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# ✅ Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ✅ Static and Media Files
STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# ✅ CORS (Cross-Origin Resource Sharing) Settings
CORS_ALLOWED_ORIGINS = [
    "https://www.holidayqr.com",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = list(default_headers) + [
    'access-control-allow-origin',
]

# ✅ Auto Field Setting
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
