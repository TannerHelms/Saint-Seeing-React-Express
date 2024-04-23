FROM python:3.12.1

WORKDIR /app

COPY ./worker.py ./worker.py

COPY ./schema.prisma ./schema.prisma

RUN pip install redis

RUN pip install bullmq

RUN pip install pillow

RUN pip install prisma

RUN pip install requests

RUN prisma generate


CMD ["python", "worker.py"]
