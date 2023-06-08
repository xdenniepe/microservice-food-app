#!/bin/bash

./mvnw clean -DskipTests package
docker build -t api-auth .
docker tag api-auth yokai.azurecr.io/api-auth
docker push yokai.azurecr.io/api-auth
kubectl rollout restart deploy api-auth

# M1 - amd64 platform
# ./mvnw clean -DskipTests package
# docker buildx create --use
# docker buildx ls
# docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/api-auth --push .
# docker buildx prune --all

# chmod +x ./docker-auth.sh
# sudo cp ./docker-auth.sh /usr/local/bin/docker-auth
# docker-auth