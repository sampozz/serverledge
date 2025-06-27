#!/bin/bash

set -euo pipefail

log() {
  echo -e "[INFO] $1"
}

error() {
  echo -e "\n[ERROR] $1\n" >&2
  exit 1
}

log "Checking for required dependencies..."

if ! command -v docker &> /dev/null; then
  error "Docker is not installed. Please install Docker first."
fi

if ! command -v go &> /dev/null; then
  error "Go is not installed. Please install Go first."
fi

log "All dependencies are installed."
log "Building base images..."

# Build base images (these are still handled by Makefile)
cd serverledge || error "Failed to change directory to serverledge."
make image-python310
make image-base
cd .. || error "Failed to change directory back to root."

log "Base images built successfully."
log "Creating RAMDISK on /mnt/ramdisk..."

# Create RAMDISK (this still needs to be done outside Docker Compose)
if ! mountpoint -q /mnt/ramdisk; then
  sudo mkdir -p /mnt/ramdisk
  sudo mount -t tmpfs -o size=1G tmpfs /mnt/ramdisk
  if [ $? -ne 0 ]; then
    error "Failed to create RAMDISK on /mnt/ramdisk."
  fi
fi

log "RAMDISK created successfully on /mnt/ramdisk."

# Check if deepspeech model is already downloaded
if [ ! -f "figaro/videosearcher/deepspeech/deepspeech-0.9.3-models.pbmm" ]; then
  log "Downloading DeepSpeech model..."
  
  wget -O figaro/videosearcher/deepspeech/deepspeech-0.9.3-models.pbmm https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm
  wget -O figaro/videosearcher/deepspeech/deepspeech-0.9.3-models.scorer https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer

  if [ $? -ne 0 ]; then
    error "Failed to download DeepSpeech model."
  fi
else
  log "DeepSpeech model already exists."
fi

log "Building all Docker images and starting services..."

# Build all images including the videosearcher function images
docker compose --profile build-only build

# Start the main services (etcd, prometheus, figaro-agent, figaro-controller)
docker compose up -d

if [ $? -ne 0 ]; then
  error "Failed to start services with Docker Compose."
fi

log "\nAll services started successfully!"
log "Services running:"
log "- serverledge: http://localhost:1323"
log "- etcd: http://localhost:2379"
log "- prometheus: http://localhost:9090"
log "- figaro-agent: http://localhost:5100"
log "- figaro-controller: running\n"

log "To view logs: docker compose logs -f [service-name]"
log "To stop all services: docker compose down"
