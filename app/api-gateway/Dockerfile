FROM --platform=linux/amd64 openjdk:17-jdk-alpine3.13
COPY target/*.jar gateway.jar
ENTRYPOINT ["java","-jar", "/gateway.jar"]
EXPOSE 8000