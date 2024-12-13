# Node Express REST API

This repository contains a simple REST API built with Node.js and Express. The project demonstrates CRUD (Create, Read, Update, Delete) operations and serves as an example for understanding Express.js concepts and middleware usage. The API uses mock data stored in memory and includes validation with Joi.

## Features

- **GET /api/users**: Retrieve all users.
- **GET /api/users/:id**: Retrieve a specific user by ID.
- **POST /api/users**: Add a new user.
- **PUT /api/users/:id**: Update an existing user's details.
- **DELETE /api/users/:id**: Delete a user by ID.
- **Validation**: Request data validation using Joi.
- **Middlewares**:
  - Helmet for enhancing security.
  - Morgan for HTTP request logging (development only).
  - Express.json and Express.urlencoded for parsing request bodies.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/node-express-rest-api.git
   cd node-express-rest-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the server:

   ```bash
   node index.js
   ```

2. By default, the server runs on `http://localhost:3000/`.

### API Endpoints

#### Base URL

```
http://localhost:3000/api/users
```

#### Endpoints

- **GET /**: Returns a welcome message.
- **GET /api/users**: Retrieves all users.
- **GET /api/users/:id**: Retrieves a specific user by ID.
- **POST /api/users**: Creates a new user. 
  - Body example:
    ```json
    {
      "name": "John Doe",
      "age": 30
    }
    ```
- **PUT /api/users/:id**: Updates an existing user by ID.
  - Body example:
    ```json
    {
      "name": "John Smith",
      "age": 35
    }
    ```
- **DELETE /api/users/:id**: Deletes a user by ID.

### Middleware Usage

- **Helmet**: Secures the application by setting various HTTP headers.
- **Morgan**: Logs HTTP requests when in development mode.
- **Express.json**: Parses JSON payloads in incoming requests.
- **Express.urlencoded**: Parses URL-encoded payloads.

### Validation

User data is validated using Joi. The schema ensures:

- `name`: A string with a minimum of 3 characters, required.
- `age`: An integer between 0 and 120, required.

Example validation code:

```javascript
const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().integer().max(120).required(),
});
```

## Learning Outcomes

- Understand the basics of Express.js.
- Implement CRUD operations in a REST API.
- Use middleware for security, logging, and parsing requests.
- Validate input data with Joi.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
