#!/bin/bash

docker build -t client-mobile --build-arg BUILD_ENV=test .
docker tag client-mobile yokai.azurecr.io/client-mobile
docker push yokai.azurecr.io/client-mobile
kubectl rollout restart deploy client-mobile

# M1 - amd64 platform
# docker buildx create --use
# docker buildx ls
# docker buildx build --platform linux/amd64 --tag yokai.azurecr.io/client-mobile --build-arg BUILD_ENV=test --push .
# docker buildx prune --all

# chmod +x ./docker-client-tst.sh
# sudo cp ./docker-client-tst.sh /usr/local/bin/docker-client-tst
# docker-client-tst