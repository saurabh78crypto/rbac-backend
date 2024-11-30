# Role-Based Access Control (RBAC) Backend System

## Overview

This project is a backend implementation of a **Role-Based Access Control (RBAC)** system using the **MERN stack**. It provides secure **authentication** and **authorization** using **JWT**, with user roles such as Admin, Moderator, and User. The system ensures access control for protected routes based on user roles.

## Features

- User Registration and Login with secure password hashing (using `bcrypt`).
- Authentication using **JWT**.
- Authorization via RBAC with roles: `Admin`, `Moderator`, and `User`.
- Protected routes accessible based on assigned roles.
- Rate limiting to prevent abuse and brute-force attacks.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt for password hashing.
- jsonwebtoken (JWT) for authentication.
- express-rate-limit for rate limiting.
- dotenv for environment variable management.

## Getting Started

1. **Prerequisites**
    - Node.js (v16+ recommended)
    - MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)
    - Postman for API testing (optional)

2. **Clone the Repository**
```bash
git clone https://github.com/saurabh78crypto/rbac-backend.git
cd rbac-backend  
```

3. **Install Dependencies**
```bash
npm install  
```

4. **Configure Environment Variables**
- Create a `.env` file in the root directory and add the following:
```js
PORT=5000  
MONGO_URI=<your-mongodb-uri>  
JWT_SECRET=<your-secret-key> 
```

5. **Start the Server**
```bash
npm start  
```
- The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication Routes

| Method | Endpoint             | Description                  | Authorization |
|--------|----------------------|------------------------------|---------------|
| POST   | `/api/auth/register` | Register a new user          | Public        |
| POST   | `/api/auth/login`    | Log in a user and get JWT    | Public        |
| POST   | `/api/auth/logout`   | Log out a user (client-side) | Public        |


### Protected Routes

| Method | Endpoint                   | Description               | Authorization           |
|--------|----------------------------|---------------------------|-------------------------|
| GET    | `/api/protected/admin`     | Access Admin-only route   | Admin                   |
| GET    | `/api/protected/moderator` | Access Moderator route    | Moderator, Admin        |
| GET    | `/api/protected/user`      | Access User route         | User, Moderator, Admin  |


## Rate Limiting

- Each IP is limited to 10 requests per 15 minutes.
- Excessive requests will return:
 ```json
 { "message": "Too many requests from this IP, please try again after 15 minutes." } 
 ```

## Project Structure

```plaintext
rbac-backend/  
├── config/  
│   └── db.js               # MongoDB connection  
├── middlewares/  
│   ├── authMiddleware.js   # JWT authentication  
│   └── roleMiddleware.js   # Role-based authorization  
├── models/  
│   └── user.js             # User model  
├── routes/  
│   ├── authRoutes.js       # Authentication routes  
│   └── protectedRoutes.js  # Protected routes  
├── .env                    # Environment variables  
├── .gitignore              # Git ignore file  
├── package.json            # Project dependencies and scripts  
└── server.js               # Main server file  
```

## Testing the API

1. **Register a User:**
    - Send a POST request to /api/auth/register with username, password, and role in the body.

2. **Log In:**
    - Send a POST request to /api/auth/login with username and password. Copy the JWT token from the response.

3. **Access Protected Routes:**
    - Send GET requests to /api/protected/admin, /api/protected/moderator, or /api/protected/user.
    - Include the JWT token in the Authorization header as:
      ```plaintext
        Authorization: Bearer <token>  
      ```

4. **Test Rate Limiting:**
    - Send over 10 requests to any endpoint within 15 minutes to test rate limiting.