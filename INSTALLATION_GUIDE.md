# SolarTech India - Installation Guide

This guide provides detailed instructions for setting up and deploying the SolarTech India e-commerce platform.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Database Configuration](#database-configuration)
- [Application Configuration](#application-configuration)
- [Building the Application](#building-the-application)
- [Running the Application](#running-the-application)
- [Deployment Options](#deployment-options)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure your system meets the following requirements:

### Hardware Requirements
- Minimum 4GB RAM (8GB recommended)
- 20GB available disk space
- Processor: Dual-core 2GHz or higher

### Software Requirements
- Java Development Kit (JDK) 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher
- Git (for version control)
- IDE such as IntelliJ IDEA, Eclipse, or VS Code (optional but recommended)

## Setting Up the Development Environment

1. **Install Java 17**
   
   **For Windows:**
   - Download JDK 17 from [Oracle](https://www.oracle.com/java/technologies/downloads/#java17) or [AdoptOpenJDK](https://adoptopenjdk.net/)
   - Run the installer and follow the instructions
   - Set JAVA_HOME environment variable:
     ```
     setx JAVA_HOME "C:\Program Files\Java\jdk-17"
     setx PATH "%PATH%;%JAVA_HOME%\bin"
     ```
   
   **For macOS:**
   - Use Homebrew: `brew install openjdk@17`
   - Set JAVA_HOME: `export JAVA_HOME=$(/usr/libexec/java_home -v 17)`
   
   **For Linux:**
   - Use package manager: `sudo apt install openjdk-17-jdk` (Ubuntu/Debian)
   - Set JAVA_HOME: `export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64`

2. **Install MySQL 8.0**
   
   **For Windows:**
   - Download MySQL installer from [MySQL website](https://dev.mysql.com/downloads/installer/)
   - Run the installer and select MySQL Server 8.0
   - Set a secure root password
   - Complete the installation and ensure the service is running
   
   **For macOS:**
   - Use Homebrew: `brew install mysql`
   - Start MySQL: `brew services start mysql`
   - Set root password: `mysql_secure_installation`
   
   **For Linux:**
   - Use package manager: `sudo apt install mysql-server` (Ubuntu/Debian)
   - Secure installation: `sudo mysql_secure_installation`
   - Start service: `sudo systemctl start mysql`

3. **Install Maven**
   
   **For Windows:**
   - Download from [Maven website](https://maven.apache.org/download.cgi)
   - Extract to a directory (e.g., `C:\Program Files\Apache\maven`)
   - Add to PATH: `setx PATH "%PATH%;C:\Program Files\Apache\maven\bin"`
   
   **For macOS:**
   - Use Homebrew: `brew install maven`
   
   **For Linux:**
   - Use package manager: `sudo apt install maven` (Ubuntu/Debian)

4. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Shopping_Cart
   ```

## Database Configuration

1. **Create MySQL Database**
   
   Connect to MySQL server:
   ```bash
   mysql -u root -p
   ```
   
   Create the database:
   ```sql
   CREATE DATABASE ecommerce_db;
   CREATE USER 'ecommerceuser'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerceuser'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

2. **Database Schema**
   
   The application will automatically create the schema when it first runs using Hibernate's `ddl-auto` setting in the application.properties file.

## Application Configuration

1. **Configure `application.properties`**
   
   Navigate to `src/main/resources` and modify the `application.properties` file:
   
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.datasource.username=ecommerceuser
   spring.datasource.password=your_password
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   spring.jpa.hibernate.ddl-auto=update
   
   # Email Configuration
   # Replace with your actual SMTP settings
   spring.mail.host=smtp.gmail.com
   spring.mail.username=your_email@gmail.com
   spring.mail.password=your_app_password
   spring.mail.port=587
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   
   # File Upload Configuration
   spring.servlet.multipart.max-file-size=50MB
   spring.servlet.multipart.max-request-size=50MB
   ```

2. **Create Initial Directory Structure**
   
   Create directories for image storage:
   
   ```bash
   mkdir -p src/main/resources/static/img/profile_img
   mkdir -p src/main/resources/static/img/product_img
   mkdir -p src/main/resources/static/img/category_img
   ```

## Building the Application

1. **Clean and Build**
   
   ```bash
   mvn clean install
   ```
   
   This will:
   - Download all dependencies
   - Compile the code
   - Run unit tests
   - Build a JAR file in the `target` directory

## Running the Application

1. **Run with Maven**
   
   ```bash
   mvn spring-boot:run
   ```
   
   This will start the application, typically on port 8080.

2. **Run as JAR**
   
   ```bash
   java -jar target/Shopping_Cart-0.0.1-SNAPSHOT.jar
   ```

3. **Access the Application**
   
   Open a web browser and navigate to:
   ```
   http://localhost:8080
   ```

## Deployment Options

### Tomcat Deployment

1. **Build WAR file**
   
   Modify the `pom.xml` to package as a WAR:
   ```xml
   <packaging>war</packaging>
   ```
   
   Add the Tomcat dependency:
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-tomcat</artifactId>
       <scope>provided</scope>
   </dependency>
   ```
   
   Extend the SpringBootServletInitializer:
   ```java
   @SpringBootApplication
   public class ShoppingCartApplication extends SpringBootServletInitializer {
       @Override
       protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
           return application.sources(ShoppingCartApplication.class);
       }
       
       public static void main(String[] args) {
           SpringApplication.run(ShoppingCartApplication.class, args);
       }
   }
   ```
   
   Build the WAR file:
   ```bash
   mvn clean package
   ```
   
2. **Deploy to Tomcat**
   - Copy the WAR file to Tomcat's `webapps` directory
   - Start Tomcat: `catalina.sh run` or `catalina.bat run`

### Docker Deployment

1. **Create a Dockerfile**
   
   Create a file named `Dockerfile` in the project root:
   ```dockerfile
   FROM eclipse-temurin:17-jdk
   WORKDIR /app
   COPY target/Shopping_Cart-0.0.1-SNAPSHOT.jar app.jar
   ENTRYPOINT ["java", "-jar", "app.jar"]
   ```

2. **Build and Run Docker Image**
   ```bash
   docker build -t solartechindia .
   docker run -p 8080:8080 solartechindia
   ```

### Production Deployment Considerations

1. **Set Production Properties**
   
   Create a `application-prod.properties` file:
   ```properties
   # Production Database
   spring.datasource.url=jdbc:mysql://production-db-host:3306/ecommerce_db
   
   # Set production-specific settings
   spring.jpa.hibernate.ddl-auto=none
   
   # Enable HTTPS
   server.port=443
   server.ssl.key-store=classpath:keystore.p12
   server.ssl.key-store-password=your-keystore-password
   server.ssl.key-store-type=PKCS12
   server.ssl.key-alias=tomcat
   ```

2. **Run with Production Profile**
   ```bash
   java -jar -Dspring.profiles.active=prod target/Shopping_Cart-0.0.1-SNAPSHOT.jar
   ```

## Security Considerations

1. **Database Security**
   - Use strong passwords
   - Limit database access to necessary IP addresses
   - Regularly backup the database

2. **Application Security**
   - Keep dependencies updated with security patches
   - Set up HTTPS for production
   - Configure CSRF protection

3. **Email Configuration Security**
   - Use app-specific passwords for Gmail
   - Consider using environment variables for credentials

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   
   **Symptoms:**
   - Application fails to start with database connectivity errors
   
   **Solutions:**
   - Verify MySQL server is running
   - Check database credentials in application.properties
   - Ensure the database exists
   - Confirm the database user has correct permissions

2. **Java Version Issues**
   
   **Symptoms:**
   - Compilation errors related to language features
   
   **Solutions:**
   - Verify JDK version: `java -version`
   - Ensure JAVA_HOME is set correctly
   - Configure IDE to use JDK 17

3. **Image Upload Problems**
   
   **Symptoms:**
   - Images not showing after upload
   - File upload errors
   
   **Solutions:**
   - Check directory permissions
   - Verify the correct file paths are being used
   - Ensure multipart file configuration in application.properties

4. **Email Sending Failures**
   
   **Symptoms:**
   - Order confirmation emails not being sent
   
   **Solutions:**
   - Verify SMTP settings
   - For Gmail, ensure "Less secure app access" is enabled or use app password
   - Check for email service logs in the application

### Getting Support

If you encounter issues not covered in this guide, please:

1. Check the application logs for error messages
2. Consult the full documentation in the `docs` directory
3. File an issue on the project repository
4. Contact the development team for support

## Next Steps

After successful installation, refer to the following documents:

- **User Guide**: For instructions on using the application
- **Administrator Guide**: For managing the platform
- **API Documentation**: For integration with other systems
- **Technical Overview**: For understanding the architecture 