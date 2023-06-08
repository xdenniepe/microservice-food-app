FROM --platform=linux/amd64 openjdk:17-jdk-alpine3.13
COPY target/*.jar payment.jar
ENTRYPOINT ["java","-jar", "/payment.jar"]
EXPOSE 8082