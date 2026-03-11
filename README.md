# Task Manager API

RESTful API for managing daily tasks built with Node.js and Express. Supports user authentication, full CRUD operations on tasks, and a one-to-many relationship between users and tasks.

---

## Tech Stack

| Layer     | Technology |
| --------- | ---------- |
| Runtime   | Node.js    |
| Framework | Express v5 |
| Database  | MySQL      |
| Auth      | JWT        |

---

## Installation & Running

---

## Database Setup

`task_api.sql` file is included in the root of the project. Run it using your MySQL client:

**MySQL CLI:**

```bash
mysql -u root -p < database.sql
```

**MySQL Workbench / phpMyAdmin:**
Import `database.sql` and execute the file. This will create the `task_api` database

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/nia212/task-api.git
cd task-api
```

**2. Install dependencies**

```bash
npm init -y
npm install express mysql2 dotenv bcrypt jsonwebtoken
```

**3. Create environment file**

Create `.env` file in the root directory

**4. Start the development server**

```bash
npm run dev
```

The server will run on `http://localhost:3001`

---

### Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer PUT_TOKEN_HERE
```

---

## Request & Response Examples

### POST `/users` — Register User

**Request**

```json
{
  "name": "Karina Young",
  "email": "k@gmail.com",
  "password": "xxxxxx"
}
```

**Response `200 OK`**

```json
{
  "message": "User created",
  "id": 1
}
```

---

### POST `/users/login` — Login

**Request**

```json
{
  "email": "k@gmail.com",
  "password": "xxxxxx"
}
```

**Response `200 OK`**

```json
{
  "token": "eyxxxxxxxxxxxxxxxx..."
}
```

---

### POST `/tasks` — Create Task

> Requires Authorization header

**Request**

```json
{
  "title": "Finish report",
  "description": "Complete the Q1 report",
  "status": "pending"
}
```

**Response `200 OK`**

```json
{
  "message": "Task created",
  "id": 1
}
```

---

### GET `/task/my-tasks` — Get My Tasks

> Requires Authorization header

**Response `200 OK`**

```json
[
  {
    "id": 1,
    "title": "Finish report",
    "description": "Complete the Q1 report",
    "status": "pending",
    "user_id": 1,
    "created_at": "2026-03-11T10:00:00.000Z"
  }
]
```

---

### PUT `/task/:id` — Update Task

> Requires Authorization header

**Request**

```json
{
  "title": "Finish report",
  "description": "Complete the Q1 report",
  "status": "in-progress"
}
```

**Response `200 OK`**

```json
{
  "message": "Task updated"
}
```

---

### DELETE `/task/:id` — Delete Task

> Requires Authorization header

**Response `200 OK`**

```json
{
  "message": "Task deleted"
}
```

---

### GET `/users/:id/task` — Get Tasks by User ID

**Response `200 OK`**

```json
[
  {
    "id": 5,
    "title": "Finish report",
    "description": "Complete the Q1 report",
    "status": "pending",
    "user_id": 1,
    "created_at": "2026-03-11T10:00:00.000Z"
  }
]
```

---

### Error Responses

| Status | Meaning                                 |
| ------ | --------------------------------------- |
| 400    | Bad request — missing or invalid input  |
| 401    | Unauthorized — invalid or missing token |
| 404    | Not found — resource does not exist     |
| 500    | Internal server error                   |

**Example `400`**

```json
{
  "message": "Name, email, and password are required"
}
```
