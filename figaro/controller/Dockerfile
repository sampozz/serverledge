FROM python:3.10-slim

WORKDIR /app

COPY ./figaro/controller/ /app/

RUN pip install --no-cache-dir -r requirements.txt
RUN mkdir -p logs

CMD ["python", "controller.py"]