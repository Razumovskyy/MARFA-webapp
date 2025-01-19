#!/bin/sh
set -e

# Build and run the Fortran project
cd core
fpm build

cd ..

# Run Django migrations
python api-server/manage.py migrate --noinput

# Start Django server in the background
python api-server/manage.py runserver 0.0.0.0:8000
