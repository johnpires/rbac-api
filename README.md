# RBAC API

This is an API project developed in NestJS with JWT authentication and Role-Based Access Control (RBAC) using PostgreSQL.

## Project Structure

The project structure is organized as follows:

```
src/
│
├── auth/
│   ├── dto/
│   ├── entities/
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│
├── rbac/
│   ├── dto/
│   ├── entities/
│   │   ├── permission.entity.ts
│   │   ├── role.entity.ts
│   ├── rbac.controller.ts
│   ├── rbac.module.ts
│   ├── rbac.service.ts
│
├── users/
│   ├── dto/
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
│
├── app.module.ts
└── main.ts
```

### Module Descriptions

- **auth/**: Contains authentication logic, including JWT strategies, guards, and the authentication service.
- **rbac/**: Implements role-based access control, including the `Role` and `Permission` entities.
- **users/**: Manages user-related operations such as creation, update, removal, and role assignment.

## Prerequisites

- Node.js v14 or higher
- PostgreSQL

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/johnpires/rbac-api
cd rbac-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Database

Make sure you have PostgreSQL installed and running on your machine. Create a database:

```sql
CREATE DATABASE rbac;
```

Update the `.env` file with your database credentials:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=rbac
SECRET_KEY=your_secret_key
```

### 4. Run Migrations

If you have migrations configured, run them to create the tables:

```bash
npm run typeorm migration:run
```

### 5. Start the Application

```bash
npm run start
```

The application will be available at `http://localhost:3000`.

## Testing the API

### 1. User Registration

Endpoint: `POST /auth/register`

Body:

```json
{
  "username": "john",
  "password": "mypassword"
}
```

### 2. User Login

Endpoint: `POST /auth/login`

Body:

```json
{
  "username": "john",
  "password": "mypassword"
}
```

Expected Response:

```json
{
  "access_token": "your_jwt_token"
}
```

### 3. Role Assignment

Endpoint: `POST /rbac/assign-role/john`

Headers:

```plaintext
Authorization: Bearer your_jwt_token
```

Body:

```json
{
  "role": "admin"
}
```

### 4. Access Protected Routes

Endpoint: `GET /users`

Headers:

```plaintext
Authorization: Bearer your_jwt_token
```

## Database Structure

- **users**: Contains user information.
- **roles**: Contains different roles that can be assigned to users.
- **permissions**: Defines the permissions associated with roles.

## Contribution

Feel free to open issues and pull requests to improve this project.

## License

This project is licensed under the terms of the MIT license.
