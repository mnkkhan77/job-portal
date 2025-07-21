FROM maven:3.9.10-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Use a slim base Java image
FROM openjdk:17-jdk-slim

# Optional: Install basic networking tools (for debugging)
# Remove this section in production for smaller image size
RUN apt-get update && apt-get install -y \
    iputils-ping \
    curl \
    dnsutils \
    netcat \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /app

# Copy your JAR file into the image
COPY target/job-portal-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on (adjust if needed)
EXPOSE 8080

# Default command to run the app
CMD ["java", "-jar", "app.jar"]
