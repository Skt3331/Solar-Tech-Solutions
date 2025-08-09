# SolarTech India API Testing Collection

This document describes the Postman collection for testing all APIs in the SolarTech India e-commerce application. You can import this into Postman to test the application's endpoints.

## Collection Structure

The collection is organized by functional areas of the application:

1. Authentication
2. User Management
3. Products
4. Categories
5. Shopping Cart
6. Orders
7. Admin Operations

## Configuration

### Environment Variables

Set up the following environment variables in Postman:

- `base_url`: The base URL of your application (e.g., `http://localhost:8080`)
- `admin_token`: Authentication token for admin user
- `user_token`: Authentication token for regular user

## Authentication Tests

### User Login

```
POST {{base_url}}/login
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=user123
```

**Tests:**
```javascript
pm.test("Successful login returns 200 OK", function() {
    pm.response.to.have.status(200);
});

if (pm.response.headers.get("Set-Cookie")) {
    pm.environment.set("user_token", pm.response.headers.get("Set-Cookie").split(";")[0]);
}
```

### Admin Login

```
POST {{base_url}}/login
Content-Type: application/x-www-form-urlencoded

username=admin@solartechindia.com&password=admin123
```

**Tests:**
```javascript
pm.test("Successful admin login returns 200 OK", function() {
    pm.response.to.have.status(200);
});

if (pm.response.headers.get("Set-Cookie")) {
    pm.environment.set("admin_token", pm.response.headers.get("Set-Cookie").split(";")[0]);
}
```

### Logout

```
GET {{base_url}}/logout
Cookie: {{user_token}}
```

## User Management Tests

### User Registration

```
POST {{base_url}}/saveUser
Content-Type: multipart/form-data

name: Test User
email: test.user@example.com
mobileNumber: 9876543210
address: 123 Test Street
city: Test City
state: Test State
pincode: 123456
password: test123
img: [Select file]
```

### Get User Profile

```
GET {{base_url}}/user/profile
Cookie: {{user_token}}
```

### Update User Profile

```
POST {{base_url}}/user/update-profile
Cookie: {{user_token}}
Content-Type: multipart/form-data

id: 1
name: Updated Name
mobileNumber: 9876543210
address: Updated Address
city: Updated City
state: Updated State
pincode: 654321
img: [Select file]
```

### Change Password

```
POST {{base_url}}/user/change-password
Cookie: {{user_token}}
Content-Type: application/x-www-form-urlencoded

currentPassword=user123&newPassword=newpass123&confirmPassword=newpass123
```

### Forgot Password

```
POST {{base_url}}/forgot-password
Content-Type: application/x-www-form-urlencoded

email=user@example.com
```

### Reset Password

```
POST {{base_url}}/reset-password
Content-Type: application/x-www-form-urlencoded

token=your-reset-token&password=newpass123
```

## Product Tests

### Get All Products

```
GET {{base_url}}/products
```

### Get Products by Category

```
GET {{base_url}}/products?category=Solar Panels
```

### Search Products

```
GET {{base_url}}/products?ch=inverter
```

### Get Product Details

```
GET {{base_url}}/product/1
```

## Category Tests

### Get All Categories (Public)

```
GET {{base_url}}/
```

## Shopping Cart Tests

### Add to Cart

```
GET {{base_url}}/user/addCart?pid=1&uid=1
Cookie: {{user_token}}
```

### View Cart

```
GET {{base_url}}/user/cart
Cookie: {{user_token}}
```

### Update Cart Quantity

```
GET {{base_url}}/user/cartQuantityUpdate?sy=inc&cid=1
Cookie: {{user_token}}
```

## Order Tests

### Create Order

```
POST {{base_url}}/user/save-order
Cookie: {{user_token}}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobileNo": "9876543210",
  "address": "123 Main Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "paymentType": "Cash on Delivery"
}
```

### View User Orders

```
GET {{base_url}}/user/user-orders
Cookie: {{user_token}}
```

### Update Order Status (User)

```
GET {{base_url}}/user/update-status?id=1&st=6
Cookie: {{user_token}}
```

## Admin API Tests

### Admin Dashboard

```
GET {{base_url}}/admin/
Cookie: {{admin_token}}
```

### Product Management

#### Get All Products (Admin)

```
GET {{base_url}}/admin/products
Cookie: {{admin_token}}
```

#### Add Product

```
POST {{base_url}}/admin/saveProduct
Cookie: {{admin_token}}
Content-Type: multipart/form-data

title: Test Solar Panel
description: This is a test solar panel
category: Solar Panels
price: 15000
discount: 10
stock: 50
isActive: true
file: [Select file]
```

#### Edit Product

```
POST {{base_url}}/admin/updateProduct
Cookie: {{admin_token}}
Content-Type: multipart/form-data

id: 1
title: Updated Solar Panel
description: Updated description
category: Solar Panels
price: 16000
discount: 15
stock: 45
isActive: true
file: [Select file]
```

#### Delete Product

```
GET {{base_url}}/admin/deleteProduct/1
Cookie: {{admin_token}}
```

### Category Management

#### Get All Categories (Admin)

```
GET {{base_url}}/admin/category
Cookie: {{admin_token}}
```

#### Add Category

```
POST {{base_url}}/admin/saveCategory
Cookie: {{admin_token}}
Content-Type: multipart/form-data

name: Test Category
isActive: true
file: [Select file]
```

#### Edit Category

```
POST {{base_url}}/admin/updateCategory
Cookie: {{admin_token}}
Content-Type: multipart/form-data

id: 1
name: Updated Category
isActive: true
file: [Select file]
```

#### Delete Category

```
GET {{base_url}}/admin/deleteCategory/1
Cookie: {{admin_token}}
```

### Order Management

#### Get All Orders (Admin)

```
GET {{base_url}}/admin/orders
Cookie: {{admin_token}}
```

#### Search Order by ID

```
GET {{base_url}}/admin/search-order?orderId=ORD123456
Cookie: {{admin_token}}
```

#### Update Order Status (Admin)

```
POST {{base_url}}/admin/update-order-status
Cookie: {{admin_token}}
Content-Type: application/x-www-form-urlencoded

id=1&st=5
```

### User Management (Admin)

#### View Users

```
GET {{base_url}}/admin/users?type=1
Cookie: {{admin_token}}
```

#### View Admins

```
GET {{base_url}}/admin/users?type=2
Cookie: {{admin_token}}
```

#### Update User Status

```
GET {{base_url}}/admin/updateSts?status=true&id=2&type=1
Cookie: {{admin_token}}
```

#### Add Admin User

```
POST {{base_url}}/admin/save-admin
Cookie: {{admin_token}}
Content-Type: multipart/form-data

name: Admin Test
email: admin.test@solartechindia.com
mobileNumber: 9876543210
address: 123 Admin Street
city: Admin City
state: Admin State
pincode: 123456
password: admin123
cpassword: admin123
img: [Select file]
```

## Additional Tests

### Solar Calculator

```
GET {{base_url}}/calculator
```

### Content Pages

```
GET {{base_url}}/blog
GET {{base_url}}/how-it-works
GET {{base_url}}/testimonials
GET {{base_url}}/financing
GET {{base_url}}/resources
GET {{base_url}}/solutions
```

## Error Handling Tests

### Access Denied

```
GET {{base_url}}/admin/
Cookie: {{user_token}}
```

### Not Found

```
GET {{base_url}}/nonexistent-page
```

### Invalid Input

```
POST {{base_url}}/user/save-order
Cookie: {{user_token}}
Content-Type: application/json

{
  "firstName": "",
  "lastName": "",
  "email": "invalid-email",
  "mobileNo": "",
  "address": "",
  "city": "",
  "state": "",
  "pincode": "",
  "paymentType": ""
}
```

## Test Automation

### Pre-request Script for Authentication

```javascript
if (!pm.environment.get("user_token")) {
    const loginRequest = {
        url: pm.environment.get("base_url") + "/login",
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            mode: 'urlencoded',
            urlencoded: [
                {key: "username", value: "user@example.com"},
                {key: "password", value: "user123"}
            ]
        }
    };
    
    pm.sendRequest(loginRequest, function (err, res) {
        if (err) {
            console.error(err);
        } else {
            if (res.headers.get("Set-Cookie")) {
                pm.environment.set("user_token", res.headers.get("Set-Cookie").split(";")[0]);
            }
        }
    });
}
```

### Collection Runner Flow

To test the complete user journey:

1. User registration
2. User login
3. Browse products
4. Add to cart
5. Create order
6. View orders
7. Update profile
8. Logout

## Import Instructions

1. Save this collection as a JSON file
2. In Postman, click "Import"
3. Upload the JSON file
4. Set up environment variables
5. Start testing

## JSON Collection Export

You can export this collection to a JSON file using the "Export" button in Postman, or use the following template structure:

```json
{
  "info": {
    "name": "SolarTech India API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "User Login",
          "request": {
            "method": "POST",
            "header": [],
            "url": {
              "raw": "{{base_url}}/login",
              "host": ["{{base_url}}"],
              "path": ["login"]
            },
            "body": {
              "mode": "urlencoded",
              "urlencoded": [
                {
                  "key": "username",
                  "value": "user@example.com"
                },
                {
                  "key": "password",
                  "value": "user123"
                }
              ]
            }
          }
        }
        // Additional endpoints...
      ]
    }
    // Additional folders...
  ]
}
``` 