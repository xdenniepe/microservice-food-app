#!/bin/bash

./mvnw clean -DskipTests package
docker build -t api-gateway .
docker tag api-gateway yokai.azurecr.io/api-gateway
docker push yokai.azurecr.io/api-gateway
kubectl rollout restart deploy api-gateway

# M1 - amd64 platform
# ./mvnw clean -DskipTests package
# docker buildx create --use
# docker buildx ls
# docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/api-gateway --push .
# docker buildx prune --all

# chmod +x ./docker-gateway.sh
# sudo cp ./docker-gateway.sh /usr/local/bin/docker-gateway
# docker-gateway