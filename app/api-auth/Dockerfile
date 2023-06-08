FROM --platform=linux/amd64 openjdk:17-jdk-alpine3.13
COPY target/*.jar auth.jar
ENTRYPOINT ["java","-jar", "/auth.jar"]
EXPOSE 8080