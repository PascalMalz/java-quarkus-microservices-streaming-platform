#!/bin/bash
echo Shell-Script for comment microservice docker installation started
# microservice variable
MICROSERVICE="comment"
# build the comment microservice mvn project
echo STEP 1: Building the comment microservice jars
./mvnw package;
# build the image for the postgres film docker container
echo STEP 2: Building the docker image for the postgres container
docker build -t postgres_$MICROSERVICE ./postgres/;
# run docker postgres container from created image
echo STEP 3: Starting the postgres docker container
docker run -d -e POSTGRES_PASSWORD=postgres --net=trailerwatch --name postgres_$MICROSERVICE postgres_$MICROSERVICE;
# build the image for the comment microservice docker container
echo STEP 4: Building the image for the comment microservice docker container
docker build -f src/main/docker/Dockerfile.jvm -t ms_$MICROSERVICE .;
# run the container from the comment microservice docker image
echo STEP 5: Starting the docker container for the comment microservice
docker run -d -p 8082:8080 --net=trailerwatch --name ms_$MICROSERVICE ms_$MICROSERVICE;
