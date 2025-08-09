# SolarTech India - E-Commerce Platform

## Overview
SolarTech India is a comprehensive e-commerce platform designed for selling solar panels and related products. This Spring Boot application provides an intuitive interface for customers to browse solar products, place orders, and track deliveries, while giving administrators powerful tools to manage inventory, process orders, and analyze sales data.

## Features
- **User Authentication & Authorization**: Secure login system with role-based access control
- **Product Management**: Complete admin control over products, categories, and inventory
- **Shopping Cart**: Seamless shopping experience with cart functionality
- **Order Processing**: End-to-end order management from placement to delivery
- **Responsive Design**: Mobile-friendly interface for all user types
- **Payment Integration**: Support for various payment methods
- **Admin Dashboard**: Comprehensive dashboard for business management

## Technology Stack
- **Backend**: Java 17 with Spring Boot 3.2.3
- **Frontend**: Thymeleaf, HTML, CSS, JavaScript, Bootstrap
- **Security**: Spring Security with custom authentication handlers
- **Database**: MySQL with Spring Data JPA
- **Build Tool**: Maven
- **Email Service**: Spring Mail for notifications

## System Requirements
- JDK 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Installation & Setup

### Prerequisites
- Java 17+ installed
- MySQL installed and running
- Maven installed

### Database Setup
1. Create a new database in MySQL:
```sql
CREATE DATABASE ecommerce_db;
```

2. Configure the database connection in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Building the Application
1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd Shopping_Cart
```

3. Build the application:
```bash
mvn clean install
```

### Running the Application
1. Start the application:
```bash
mvn spring-boot:run
```

2. Access the application:
```
http://localhost:8080
```

## Default Credentials
- **Admin Account**: 
  - Email: admin@solartechindia.com
  - Password: admin123
- **User Account**: 
  - Email: user@example.com
  - Password: user123

## Project Structure
```
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── ecom
    │   │           ├── config      # Security configuration
    │   │           ├── controller  # MVC controllers
    │   │           ├── model       # Entity models
    │   │           ├── repository  # Data access layer
    │   │           ├── service     # Business logic
    │   │           │   └── impl    # Service implementations
    │   │           └── util        # Utility classes
    │   └── resources
    │       ├── static
    │       │   ├── css            # Stylesheets
    │       │   ├── img            # Images
    │       │   └── js             # JavaScript files
    │       └── templates          # Thymeleaf templates
    │           ├── admin          # Admin panel views
    │           └── user           # User views
    └── test                       # Test classes
```

## Documentation
Detailed project documentation is available in the `Project_Documentation.md` file, which includes:
- System architecture
- Database schema
- API endpoints
- User guides
- Technical specifications

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For questions or support, please contact:
- Email: support@solartechindia.com
- Website: https://www.solartechindia.com 