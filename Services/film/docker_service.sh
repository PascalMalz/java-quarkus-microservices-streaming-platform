#!/bin/bash
# build jar from microservice source-code and create docker container with the jar
mvn package -Pnative -Dquarkus.native.container-runtime=docker;
