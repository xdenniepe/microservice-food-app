#!/bin/bash

./mvnw install -DskipTests
cd client-mobile/
npm install --legacy-peer-deps
cd ..
export $(cat .env | tr -d ' ' | grep -v "#" | xargs)

# chmod +x ./ghost-food-install.sh
# sudo cp ./ghost-food-install.sh /usr/local/bin/ghost-food-install
# ghost-food-install
# RUN npm run build-test (always update this)
