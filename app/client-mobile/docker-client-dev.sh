#!/bin/bash

# docker buildx build --platform linux/amd64 -t client-mobile --build-arg BUILD_ENV=dev .
# docker buildx --tag client-mobile yokai.azurecr.io/client-mobile
# docker buildx push yokai.azurecr.io/client-mobile

# M1 - amd64 platform
docker buildx create --use
docker buildx ls
docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/client-mobile --build-arg BUILD_ENV=dev --push .
docker buildx prune --all

# chmod +x ./docker-client-dev.sh
# sudo cp ./docker-client-dev.sh /usr/local/bin/docker-client-dev
# docker-client-dev