#!/bin/bash

# docker build -t client-mobile --build-arg BUILD_ENV=prod .
# docker tag client-mobile yokai.azurecr.io/client-mobile
# docker push yokai.azurecr.io/client-mobile

# M1 - amd64 platform
docker buildx create --use
docker buildx ls
docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/client-mobile --build-arg BUILD_ENV=prod --push .
docker buildx prune --all

# chmod +x ./docker-client-prod.sh
# sudo cp ./docker-client-prod.sh /usr/local/bin/docker-client-prod
# docker-client-prod