# Courses Marketplace API

## Requirements

- [Node.js](https://nodejs.org/en/download)
- [PostgreSQL](https://www.postgresql.org/download)

### Cloning the project
Run in terminal:

```bash
git clone git@github.com:woliveira1728/courses-marketplace-api.git
```

### Installing Dependencies
Install development and production dependencies
```bash
cd courses-marketplace-api
npm install
```
### Environment variables
Duplicate the `.env.example` file and rename the copy to `.env.dev`, overwriting the values ​​of the environment variables in the `.env.dev` file with your credentials.

The project uses the following environment variables:

| Var Name | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | Database credentials used | required |
| JWT_SECRET_KEY | Secret key used by JWT authentication | required |
| EXPIRES_IN | JWT Token Expiration Time (1ms, 1m, 1h, 1d...) | optional |

### Running the migrations

Run the command below in the project root:

```bash
npm run migrate:dev
```

### Starting the Server
The API server will run by default on port 3000:

```bash
npm run dev
```

Navigate to http://localhost:3000 to access the API.

## Routes

- Access route documentation at http://localhost:3000/docs.

- Download the Swagger documentation using the route http://localhost:3000/docs.json.
