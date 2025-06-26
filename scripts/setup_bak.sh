#!/bin/bash

set -euo pipefail
set -x  # prints each command before executing

log() {
  echo -e "\n[INFO] $1\n"
}

error() {
  echo -e "\n[ERROR] $1\n" >&2
  exit 1
}

log "Checking for required dependencies..."

if ! command -v docker &> /dev/null; then
  error "Docker is not installed. Please install Docker first."
  exit 1
fi

log "Docker is installed."

if ! command -v go &> /dev/null; then
  error "Go is not installed. Please install Go first."
  exit 1
fi

log "Go is installed."
log "Building serverledge..."

make all

if [ ! -f "bin/serverledge" ]; then
  error "Failed to build serverledge."
  exit 1
fi

log "Serverledge built successfully."
log "Building base images..."

make image-python310
make image-base

log "Base images built successfully."
log "Building Videosearcher images..."

docker build -f figaro/ffmpeg_0/Dockerfile -t videosearcher-ffmpeg_0:latest .
docker build -f figaro/ffmpeg_1/Dockerfile -t videosearcher-ffmpeg_1:latest .
docker build -f figaro/ffmpeg_2/Dockerfile -t videosearcher-ffmpeg_2:latest .
docker build -f figaro/librosa/Dockerfile -t videosearcher-librosa:latest .
docker build -f figaro/deepspeech/Dockerfile -t videosearcher-deepspeech:latest .
docker build -f figaro/grep/Dockerfile -t videosearcher-grep:latest .

log "Videosearcher images built successfully."
log "Building FIGARO agent image..."

docker build -f figaro/agent/src/production_agents/DQN/Dockerfile -t figaro-production_agent:latest .

log "FIGARO agent image built successfully."
log "Building controller image..."

docker build -f figaro/controller/Dockerfile -t figaro-controller:latest .

log "Controller image built successfully."
log "Creating RAMDISK on /mnt/ramdisk..."

if ! mountpoint -q /mnt/ramdisk; then
  sudo mkdir -p /mnt/ramdisk
  sudo mount -t tmpfs -o size=1G tmpfs /mnt/ramdisk
  if [ $? -ne 0 ]; then
    error "Failed to create RAMDISK on /mnt/ramdisk."
    exit 1
  fi
fi

log "RAMDISK created successfully on /mnt/ramdisk."
log "Starting etcd container..."

docker run -d --rm --name Etcd-server \
    --publish 2379:2379 \
    --publish 2380:2380 \
    --cpus="1" \
    --env ALLOW_NONE_AUTHENTICATION=yes \
    --env ETCD_ADVERTISE_CLIENT_URLS=http://localhost:2379 \
    bitnami/etcd:3.5.14-debian-12-r1

if [ $? -ne 0 ]; then
  error "Failed to start etcd container."
  exit 1
fi

log "etcd container started successfully."
log "Starting prometheus container..."

docker run \
    --name prometheusLocal \
    -d --rm \
    -p 9090:9090 \
    -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus:v2.37.1  \
	  --config.file=/etc/prometheus/prometheus.yml

if [ $? -ne 0 ]; then
  error "Failed to start prometheus container."
  exit 1
fi

log "Prometheus container started successfully."
log "Starting FIGARO agent container..."

docker run -p 5100:5000 --detach production_agent

if [ $? -ne 0 ]; then
  error "Failed to start FIGARO agent container."
  exit 1
fi

log "FIGARO agent container started successfully."
log "Starting controller container..."

docker run -v /var/run/docker.sock:/var/run/docker.sock figaro-controller

if [ $? -ne 0 ]; then
  error "Failed to start controller container."
  exit 1
fi

log "Controller container started successfully."

