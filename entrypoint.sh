#!/bin/sh
set -e

# Build and run the Fortran project
cd core
fpm build

cd ../api-server

# Run Django migrations
python manage.py migrate --noinput

# Start Django server in the background
exec gunicorn marfa_app.wsgi:application \
    --bind 0.0.0.0:8001 \
    --workers 2 \
    --threads 2 \
    --timeout 420 \
    --access-logfile '-' \
    --error-logfile '-'
