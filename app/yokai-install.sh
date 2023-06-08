#!/bin/bash

./mvnw install -DskipTests
cd client-mobile/
npm install --legacy-peer-deps
cd ..
export $(cat .env | tr -d ' ' | grep -v "#" | xargs)

# chmod +x ./yokai-install.sh
# sudo cp ./yokai-install.sh /usr/local/bin/yokai-install
# yokai-install
# RUN npm run build-test (always update this)