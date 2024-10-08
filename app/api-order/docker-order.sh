#!/bin/bash

./mvnw clean -DskipTests package
docker build -t api-order .
docker tag api-order yokai.azurecr.io/api-order
docker push yokai.azurecr.io/api-order
kubectl rollout restart deploy api-order

# M1 - amd64 platform
# ./mvnw clean -DskipTests package
# docker buildx create --use
# docker buildx ls
# docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/api-order --push .
# docker buildx prune --all

# chmod +x ./docker-order.sh
# sudo cp ./docker-order.sh /usr/local/bin/docker-order
# docker-order