#!/bin/bash

PORT=8090
DOCKER_IMAGE="jhshadi/home-control"
CONTAINER_NAME="home-control"

docker stop home-control
docker rm home-control

docker build -t ${DOCKER_IMAGE} .
docker run --net=host -e PORT='"'${PORT}'"' --name=${CONTAINER_NAME} ${DOCKER_IMAGE}