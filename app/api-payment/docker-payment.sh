#!/bin/bash

./mvnw clean -DskipTests package
docker build -t api-payment .
docker tag api-payment yokai.azurecr.io/api-payment
docker push yokai.azurecr.io/api-payment
kubectl rollout restart deploy api-payment

# M1 - amd64 platform
# ./mvnw clean -DskipTests package
# docker buildx create --use
# docker buildx ls
# docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/api-payment --push .
# docker buildx prune --all

# chmod +x ./docker-payment.sh
# sudo cp ./docker-payment.sh /usr/local/bin/docker-payment
# docker-payment