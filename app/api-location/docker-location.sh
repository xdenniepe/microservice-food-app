#!/bin/bash

./mvnw clean -DskipTests package
docker build -t api-location .
docker tag api-location yokai.azurecr.io/api-location
docker push yokai.azurecr.io/api-location
kubectl rollout restart deploy api-location

# M1 - amd64 platform
# ./mvnw clean -DskipTests package
# docker buildx create --use
# docker buildx ls
# docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/api-location --push .
# docker buildx prune --all

# chmod +x ./docker-location.sh
# sudo cp ./docker-mock.sh /usr/local/bin/docker-location
# docker-location