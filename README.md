# Store Rating App

A full-stack web application for managing stores and collecting user ratings. The application supports three different roles: Admin, Normal User, and Store Owner.

## Features

### Admin

* Admin dashboard with platform statistics
* View total users, stores, ratings, and store owners
* Manage users
* Search users by name, email, or address
* Filter users by role
* Add new users
* View user details
* Manage stores
* Search stores by name, email, or address
* Add new stores
* Assign stores to store owners

### Normal User

* User registration and login
* Browse available stores
* Search stores by name or address
* View store ratings and rating counts
* Submit a rating from 1 to 5 stars
* Modify an existing rating
* View personal profile
* Change account password

### Store Owner

* Store owner login
* Owner dashboard
* View store rating statistics
* View users who have rated the store
* View average store rating
* Change account password

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Lucide React
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB
* Mongoose

## Project Structure

```text
store-rating-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

> The `.env` file is used only for local configuration and is excluded from the Git repository.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/store-rating-app.git
cd store-rating-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on the local Vite development URL, usually:

```text
http://localhost:5173
```

## Authentication

The application uses JWT-based authentication.

Passwords are securely hashed using bcrypt before being stored in the database.

Protected API routes require a valid JWT token in the Authorization header:

```text
Authorization: Bearer <token>
```

## User Roles

| Role        | Main Access                     |
| ----------- | ------------------------------- |
| Admin       | Dashboard, users, stores        |
| Normal User | Stores, ratings, profile        |
| Store Owner | Store rating dashboard, profile |

## Validation

The application includes validation for:

* User name length
* Email format
* Password length
* Address length
* Rating values from 1 to 5
* User roles
* Store owner assignment

## Rating System

Each user can have one rating for a particular store.

Users can:

1. Select a rating from 1 to 5 stars.
2. Submit the rating.
3. Modify their existing rating.

Store ratings are used to calculate the store's average rating.

## API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Stores

```text
GET /api/stores/ratings
```

### Ratings

```text
POST /api/ratings
```

### User

```text
GET /api/users/profile
PUT /api/users/change-password
```

### Admin

```text
GET /api/admin/dashboard
GET /api/admin/users
GET /api/admin/users/:id
POST /api/admin/users
GET /api/admin/stores
POST /api/admin/stores
```

### Owner

Owner-specific routes are protected using authentication and role-based authorization.

## Security

* JWT authentication for protected routes
* Password hashing with bcrypt
* Role-based authorization
* Sensitive environment variables stored outside the repository
* Password fields are excluded from user detail responses

## Running the Application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

Then open the frontend URL shown by Vite in the terminal.

## Author

Developed as a full-stack store rating application using React, Node.js, Express and MongoDB.
