FROM --platform=linux/amd64 openjdk:17-jdk-alpine3.13
COPY target/*.jar order.jar
ENTRYPOINT ["java","-jar", "/order.jar"]
EXPOSE 8081