# Task Manager App

A fullstack task management app with JWT authentication.

Users can:

- register and login
- create, edit, delete their tasks
- change task status (`pending`, `in-progress`, `done`)

Live demo:

- https://task-api-gray.vercel.app/

## Tech Stack

- Frontend: React, Tailwind
- Backend: Node.js, Express, JWT
- Database: MySQL

## Installation & Run (Detailed)

## 1) Clone repository

```bash
git clone https://github.com/nia212/task-api.git
cd task-api
```

## 2) Setup backend

```bash
cd backend
npm install
```

Create `.env` in `backend/` (copy from `.env.example`):

Run backend:

```bash
npm run dev
```

Backend default URL:

- `http://localhost:3001`

## 3) Setup frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL:

- `http://localhost:5173`

## Database Setup (MySQL)

### Using MySQL Workbench

1. Open **MySQL Workbench** and connect to your local server.
2. Create a new schema (example: `task_db`):

```sql
CREATE DATABASE task_db;
```

3. Run:

```sql
USE task_db;
```

4. Run this SQL command in a new SQL tab (same as your current setup):

```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
);

show tables;

CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

5. Verify tables were created:

```sql
SHOW TABLES;
DESCRIBE users;
DESCRIBE task;
```

6. Update backend env to match Workbench connection:

```env
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=your_mysql_password
MYSQLDATABASE=task_manager
MYSQLPORT=3306
JWT_SECRET=your_jwt_secret
```

7. Restart backend after editing `.env`:

```bash
cd backend
npm run dev
```

## Authentication

Protected routes require bearer token:

```http
Authorization: Bearer <your_jwt_token>
```

## API Endpoints Documentation

### User Endpoints

- `POST /users` - Register user
- `POST /users/login` - Login user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /users/:id/tasks` - Get all tasks by user ID

### Task Endpoints

- `POST /tasks` - Create task (auth)
- `GET /tasks` - Get all tasks
- `GET /tasks/my-tasks` - Get logged-in user tasks (auth)
- `GET /tasks/:id` - Get task by ID
- `PUT /tasks/:id` - Update task (auth + ownership)
- `DELETE /tasks/:id` - Delete task (auth + ownership)

## Example Request / Response

### 1) Register

`POST /users`

Request:

```json
{
  "name": "Nia",
  "email": "nia@example.com",
  "password": "secret123"
}
```

Response `200`:

```json
{
  "message": "User created",
  "id": 1
}
```

### 2) Login

`POST /users/login`

Request:

```json
{
  "email": "nia@example.com",
  "password": "secret123"
}
```

Response `200`:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3) Create Task (auth)

`POST /tasks`

Headers:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

Request:

```json
{
  "title": "Finish report",
  "description": "Complete Q1 report",
  "status": "pending"
}
```

Response `200`:

```json
{
  "message": "Task created",
  "id": 1
}
```

### 4) Get My Tasks (auth)

`GET /tasks/my-tasks`

Response `200`:

```json
[
  {
    "id": 1,
    "title": "Finish report",
    "description": "Complete Q1 report",
    "status": "pending",
    "user_id": 1,
    "created_at": "2026-03-14T10:00:00.000Z"
  }
]
```

### 5) Update Task (auth)

`PUT /tasks/:id`

Request:

```json
{
  "title": "Finish report updated",
  "description": "Complete and send Q1 report",
  "status": "in-progress"
}
```

Response `200`:

```json
{
  "message": "Task updated"
}
```

### 6) Delete Task (auth)

`DELETE /tasks/:id`

Response `200`:

```json
{
  "message": "Task deleted"
}
```

## Common Error Responses

| Status | Meaning                                                     |
| ------ | ----------------------------------------------------------- |
| 400    | Missing or invalid input                                    |
| 401    | Missing/invalid token or invalid credentials                |
| 404    | Resource not found or not authorized for task update/delete |
| 409    | Duplicate email                                             |
| 500    | Internal server error                                       |

Example `400`:

```json
{
  "message": "Name, email, and password are required"
}
```
