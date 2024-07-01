# Dockerfile for Django

FROM python:3.12

WORKDIR /backend

COPY requirements.txt /backend/

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . /backend/
#COPY entrypoint.sh /backend/

#RUN chmod +x /backend/entrypoint.sh

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1




CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
