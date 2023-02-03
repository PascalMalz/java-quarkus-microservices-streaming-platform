#!/bin/bash
# create podman network for trailerwatch application
echo STEP 1: Creating podman network for the trailerwatch web application
podman network create trailerwatch;
# run sub shell scripts per microservice
echo STEP 2: Calling the Shell-Script of film microservice podman installation
(cd ./film && bash film_podman.sh);

