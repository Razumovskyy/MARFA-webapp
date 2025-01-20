#!/bin/sh
set -e

# Build and run the Fortran project
cd core
fpm build

cd ..

# Run Django migrations
python api-server/manage.py migrate --noinput

# Start Django server in the background
exec gunicorn api-server.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 2 \
    --threads 2 \
    --timeout 420 \
    --access-logfile '-' \
    --error-logfile '-'
