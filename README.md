# Task 12 - Middleware & Private Route Protection

## Overview

This project demonstrates authentication and authorization using Express Middleware and JWT (JSON Web Token). Users can register, login, and access protected routes only after successful authentication.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* dotenv
* CORS

## Features

* User Registration
* Password Hashing using bcrypt
* User Login
* JWT Token Generation
* Authentication Middleware
* Protected Private Route
* Authorization using JWT
* MongoDB Integration

## API Endpoints

### Register User

POST /signup

### Login User

POST /login

### Protected Route

GET /profile

## Project Structure

```
MERN-Task-12
│
├── Middleware
│   └── auth.js
│
├── Models
│   └── User.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Learning Outcomes

* Understanding Express Middleware
* Implementing JWT Authentication
* Securing Backend APIs
* Protecting Private Routes
* Managing User Authorization

## Outcome

Successfully implemented middleware-based authentication and private route protection using JWT and Express.js.
