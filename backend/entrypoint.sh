#!/bin/bash

# Wait until PostgreSQL is ready
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - applying migrations and starting server"

# Apply migrations
python manage.py migrate

# Start server
exec "$@"
