# Use OpenJDK 21 for building the Spring Boot app (since it supports Java 21)
FROM openjdk:21-jdk-slim AS build

# Set the working directory
WORKDIR /app

# Install Maven manually for JDK 21
RUN apt-get update && apt-get install -y maven

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use an official OpenJDK 21 image to run the application
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/heritaQuest-0.0.1-SNAPSHOT.jar .

# Expose port 8080
EXPOSE 8080

# Specify the command to run the application
ENTRYPOINT ["java", "-jar", "/app/heritaQuest-0.0.1-SNAPSHOT.jar"]
