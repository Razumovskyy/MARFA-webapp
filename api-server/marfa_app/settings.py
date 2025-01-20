"""
Django settings for marfa_app project.
"""
from pathlib import Path

import environ

env = environ.Env()

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env.read_env(Path(BASE_DIR) / '.env')

DJANGO_ENV = env('DJANGO_ENV', default='development')

SECRET_KEY = env('SECRET_KEY')

MEDIA_ROOT = Path(BASE_DIR) / 'media'

if DJANGO_ENV == 'development':
    DEBUG = True
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']
    CORS_ALLOWED_ORIGINS = ['http://localhost:3000']
    CURRENT_HOST = 'http://127.0.0.1:8000'
    MEDIA_URL = '/media/'
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:  # production
    DEBUG = env.bool('DEBUG')
    ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')
    CURRENT_HOST = env.str('CURRENT_HOST')
    MEDIA_URL = env.str('MEDIA_URL')
    MEDIA_ROOT = env.str('MEDIA_ROOT')
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'CONN_MAX_AGE': 0,
            'HOST': env.str('DB_HOST'),
            'PORT': env.str('DB_PORT'),
            'NAME': env.str('DB_NAME'),
            'USER': env.str('DB_USER'),
            'PASSWORD': env.str('DB_PASSWORD'),
        }
    }
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'verbose': {
                'format': '{levelname} {asctime} {module} {message}',
                'style': '{',
            },
            'simple': {
                'format': '{levelname} {message}',
                'style': '{',
            },
        },
        'handlers': {
            'console': {
                'level': 'INFO',
                'class': 'logging.StreamHandler',
                'formatter': 'verbose',
            },
        },
        'loggers': {
            'django': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': True,
            },
        },
    }

SPECTRES_ROOT = Path(MEDIA_ROOT) / 'users'

INSTALLED_APPS = [
    'corsheaders',
    'rest_framework',
    'spectres',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer',],
    'DEFAULT_PARSER_CLASSES': ['rest_framework.parsers.JSONParser',],
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_THROTTLE_RATES': {
        'calculating': '10/minute',
        'plotting': '100/minute'
    },
    'UNAUTHENTICATED_USER': None,
}

STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    }
}

ROOT_URLCONF = 'marfa_app.urls'

WSGI_APPLICATION = 'marfa_app.wsgi.application'

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

X_FRAME_OPTIONS = 'SAMEORIGIN'
USE_X_FORWARDED_HOST = True

# Calculation-related filenames in spectre dir
PT_FILENAME = 'pt-table.ptbin'
INFO_FILENAME = 'info.txt'
OUTPUT_FILENAME = 'output.dat'
