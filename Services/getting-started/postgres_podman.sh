#!/bin/bash
# microservice variable
MICROSERVICE="test"
# build podman postgres image out of Dockerfile
podman build --tag postgres:$MICROSERVICE -f ./postgres/Dockerfile;
# run podman postgres container from created image
podman run -d -e POSTGRES_PASSWORD=postgres --name postgres_$MICROSERVICE postgres:$MICROSERVICE
