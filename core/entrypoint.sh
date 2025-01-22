#!/bin/sh
set -e

cd core
fpm build

cd ../api-server

python manage.py migrate --noinput

exec gunicorn marfa_app.wsgi:application \
    --bind 0.0.0.0:8001 \
    --workers 2 \
    --max-requests 5 \
    --max-requests-jitter 2 \
    --access-logfile '-' \
    --error-logfile '-'
