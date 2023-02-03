#!/bin/bash
# microservice variable
MICROSERVICE="comment"
# build docker postgres image out of Dockerfile
docker build -t postgres_$MICROSERVICE ./postgres/;
# run docker postgres container from created image
docker run -d -e POSTGRES_PASSWORD=postgres -p 5432:5432 --name postgres_$MICROSERVICE postgres_$MICROSERVICE;
