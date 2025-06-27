FROM golang:1.21-alpine AS build

WORKDIR /app

COPY . ./

RUN apk add --no-cache make
RUN make all

CMD ["bin/serverledge", "conf.yaml"]