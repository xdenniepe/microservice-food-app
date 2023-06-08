FROM --platform=linux/amd64 openjdk:17-jdk-alpine3.13
COPY target/*.jar mock.jar
ENTRYPOINT ["java","-jar", "/mock.jar"]
EXPOSE 8084