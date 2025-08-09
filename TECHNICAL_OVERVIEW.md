# SolarTech India - Technical Overview

This document provides a technical overview of the SolarTech India e-commerce platform, explaining the architecture, design patterns, and key components.

## Architecture Overview

The application follows a multi-layered architecture pattern:

1. **Presentation Layer**: Thymeleaf templates with Bootstrap for responsive UI
2. **Controller Layer**: Spring MVC controllers handling HTTP requests
3. **Service Layer**: Business logic implementation
4. **Repository Layer**: Data access using Spring Data JPA
5. **Database Layer**: MySQL database

### Design Patterns

- **MVC Pattern**: Separation of concerns with Model-View-Controller architecture
- **Repository Pattern**: Abstraction of data access logic
- **Dependency Injection**: Spring-managed components with IoC
- **DTO Pattern**: Data Transfer Objects for communication between layers
- **Builder Pattern**: Used in complex object construction
- **Factory Pattern**: For creating service instances

## Security Implementation

The application uses Spring Security with custom authentication and authorization:

### Key Security Components:

- **SecurityConfig**: Main configuration class for Spring Security
- **UserDetailsServiceImpl**: Custom implementation of UserDetailsService
- **CustomUser**: Implementation of UserDetails for authentication
- **AuthFailureHandlerImpl**: Handles authentication failures with account locking
- **AuthSuccessHandlerImpl**: Handles successful authentication with role-based redirection

### Authentication Flow:

1. User submits login credentials
2. UserDetailsServiceImpl loads user from database
3. Spring Security authenticates credentials
4. Based on success/failure, corresponding handler is invoked
5. On success, user is redirected based on role
6. On failure, account lockout mechanism is triggered after multiple failed attempts

## Core Components

### Controllers

- **AdminController**: Handles admin panel functionality
- **HomeController**: Manages public-facing pages
- **UserController**: Manages user-specific operations
- **CustomErrorController**: Handles error pages

### Models

- **UserDtls**: User entity with role-based permissions
- **Product**: Product information with pricing and details
- **Category**: Product categorization
- **Cart**: Shopping cart implementation
- **ProductOrder**: Order management
- **OrderAddress**: Shipping information

### Services

Each service interface has a corresponding implementation:

- **UserService**: User management and authentication
- **ProductService**: Product management
- **CategoryService**: Category operations
- **CartService**: Shopping cart operations
- **OrderService**: Order processing
- **CommonService**: Shared functionality

### Repositories

JPA repositories for database operations:

- **UserRepository**: User data access
- **ProductRepository**: Product queries
- **CategoryRepository**: Category management
- **CartRepository**: Shopping cart persistence
- **ProductOrderRepository**: Order tracking

## Key Features Implementation

### Shopping Cart

1. **Add to Cart**:
   - User selects product
   - CartService checks if product already exists in cart
   - If exists, quantity is increased
   - If not, new cart entry is created

2. **Cart Management**:
   - CartController handles cart view and operations
   - Cart items are retrieved from database for current user
   - Total price calculation performed in CartService

### Order Processing

1. **Order Creation**:
   - User provides shipping information
   - OrderService creates new order from cart items
   - Unique order ID generated
   - Payment is processed
   - Email notification sent to user

2. **Order Tracking**:
   - Admin can update order status
   - Users can view their order history
   - Email notifications sent for status changes

### Product Management

1. **Admin Operations**:
   - Add/edit/delete products
   - Manage categories
   - Set pricing and discounts
   - Control inventory

2. **User Operations**:
   - Browse products
   - Filter by category
   - Search functionality
   - View product details

## Database Schema

Core tables and relationships:

1. **user_dtls**: User information and authentication
2. **product**: Product details
3. **category**: Product categories
4. **cart**: User shopping cart
5. **product_order**: Order information
6. **order_address**: Shipping details

Key relationships:
- One-to-many relationship between users and carts
- Many-to-many relationship between products and categories
- One-to-many relationship between users and orders
- One-to-one relationship between orders and shipping addresses

## Technical Challenges and Solutions

### Challenge 1: User Authentication Security
**Solution**: Implemented account lockout mechanism after failed attempts with timed release.

### Challenge 2: Shopping Cart Management
**Solution**: Used session-based approach combined with database persistence.

### Challenge 3: Order Processing
**Solution**: Implemented transactional processing to ensure data integrity.

### Challenge 4: Image Storage
**Solution**: Utilized file system storage with database references.

## API Endpoints

### Public Endpoints
- `/`: Home page
- `/products`: Product listings
- `/product/{id}`: Product details
- `/register`: User registration
- `/signin`: Login page
- `/forgot-password`: Password recovery

### User Endpoints
- `/user/cart`: Shopping cart
- `/user/orders`: Process order
- `/user/user-orders`: View orders
- `/user/profile`: User profile

### Admin Endpoints
- `/admin/`: Admin dashboard
- `/admin/products`: Product management
- `/admin/category`: Category management
- `/admin/orders`: Order management
- `/admin/users`: User management

## Performance Considerations

- **Pagination**: Implemented for large datasets
- **Caching**: Static resources cached
- **Lazy Loading**: Used for related entities
- **Indexing**: Database optimized with appropriate indexes
- **Connection Pooling**: HikariCP for database connections

## Deployment Architecture

Recommended deployment architecture:
- Application server: Tomcat or similar servlet container
- Database server: MySQL on separate instance
- Load balancer for high availability
- CDN for static assets
- Redis for caching (optional)

## Monitoring and Logging

- Logging implemented with SLF4J
- Structured logging format for better analysis
- Error tracking and notification system
- Performance metrics for critical operations

## Conclusion

The SolarTech India e-commerce platform is built with a robust, scalable architecture that follows modern design patterns and best practices in web application development. The modular approach allows for easy maintenance and future enhancements. 