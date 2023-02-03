#!/bin/bash
echo Shell-Script for film microservice podman installation started
# microservice variable
MICROSERVICE="film"
# build the film microservice mvn project
echo STEP 1: Building the film microservice jars
./mvnw package;
# build the image for the postgres film podman container
echo STEP 2: Building the podman image for the postgres container
podman build --tag postgres_$MICROSERVICE -f ./postgres/Dockerfile;
# run podman postgres container from created image
echo STEP 3: Starting the postgres podman container
podman run -d -e POSTGRES_PASSWORD=postgres --net trailerwatch --name postgres_$MICROSERVICE postgres_$MICROSERVICE;
# build the image for the film microservice podman container
echo STEP 4: Building the image for the film microservice podman container
podman build -f src/main/docker/Dockerfile.jvm --tag ms_$MICROSERVICE .;
# run the container from the film microservice podman image
echo STEP 5: Starting the podman container for the film microservice
docker run -d -p 8080:8080 --net trailerwatch --name ms_$MICROSERVICE ms_$MICROSERVICE;
