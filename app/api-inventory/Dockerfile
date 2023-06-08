FROM --platform=linux/amd64 openjdk:17-jdk-alpine3.13
COPY target/*.jar inventory.jar
ENTRYPOINT ["java","-jar", "/inventory.jar"]
EXPOSE 8083