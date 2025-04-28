FROM python:3.10-alpine3.16
RUN pip3 install jsonschema


COPY executor.py /
COPY function.py /
RUN mkdir -p /app

WORKDIR /
CMD python executor.py