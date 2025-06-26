FROM python:3.10-slim

WORKDIR /app

COPY ./figaro/controller/requirements.txt /app/requirements.txt
COPY ./figaro/controller/controller.py /app/controller.py

RUN pip install --no-cache-dir -r requirements.txt
RUN mkdir -p logs

CMD ["python", "controller.py"]