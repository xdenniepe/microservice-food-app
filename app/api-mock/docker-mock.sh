#!/bin/bash

./mvnw clean -DskipTests package
docker build -t api-mock .
docker tag api-mock yokai.azurecr.io/api-mock
docker push yokai.azurecr.io/api-mock
kubectl rollout restart deploy api-mock

# M1 - amd64 platform
# ./mvnw clean -DskipTests package
# docker buildx create --use
# docker buildx ls
# docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/api-mock --push .
# docker buildx prune --all

# chmod +x ./docker-mock.sh
# sudo cp ./docker-mock.sh /usr/local/bin/docker-mock
# docker-mock