# docker run -p 80:80 client-mobile
# build environment
FROM --platform=linux/amd64 node:16.3-alpine3.12 as build
WORKDIR /

ARG BUILD_ENV
ENV PATH /node_modules/.bin:$PATH
COPY package.json /package.json
RUN npm install --legacy-peer-deps
RUN npm config set unsafe-perm true #https://stackoverflow.com/questions/52196518/could-not-get-uid-gid-when-building-node-docker
RUN npm install react-scripts@5.0.0 -g --silent
COPY . /
RUN npm run build-$BUILD_ENV

# production environment
FROM --platform=linux/amd64 nginx:1.17.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]