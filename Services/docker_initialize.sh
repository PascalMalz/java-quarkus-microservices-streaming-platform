#!/bin/bash
# create docker network for trailerwatch application
echo STEP 1: Creating docker network for the trailerwatch web application
docker network create trailerwatch;
# run sub shell scripts per microservice
echo STEP 2: Calling the Shell-Script of film microservice docker installation
(cd ./film && bash film_docker.sh);
echo STEP 3: Calling the Shell-Script of account microservice docker installation
(cd ./account && bash account_docker.sh);
echo STEP 4: Calling the Shell-Script of comment microservice docker installation
(cd ./comment && bash comment_docker.sh);
echo STEP 5: Calling the Shell-Script of rating microservice docker installation
(cd ./rating && bash rating_docker.sh);

