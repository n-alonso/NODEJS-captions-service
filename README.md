# Captions Service

Captions Service is a portfolio project showcasing a Node.js + Express API using MongoDB. It includes tooling like ESLint, .env files, and Nodemon.  
The API features security measures such as Helmet package, basic auth on the login endpoint, JWT cookies on other endpoints, and bcrypt for password processing.  
The user endpoints require admin permissions. 

## Features

The API includes the following routes:
- /auth (Register, Login, Logout)
- /users (List, Update Role, Delete)
- /pictures (CRUD Operations)
- /captions (CRUD Operations)

User model references the `captionId`.  
Picture references the `captionId`.  
Caption references both the `userId` and `pictureId`.  

The API is documented with an `openapi.json` file (served at `/openapi.json` endpoint) and a Swagger UI (served at `/docs` endpoint).

## Tech Stack

- Node.js
- Express
- MongoDB
- bcrypt
- cookie-parser
- dotEnv
- ESLint
- Helmet
- jsonwebtoken
- Mongoose
- Nodemon
- swagger-ui-express

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. If you're installing locally, set up your own MongoDB cluster.
4. Populate the `.env` file with the necessary values.
5. Run `npm start` to start the application.

## Usage

To use the app, users need to register first, then use those credentials to login.  
After logging in, they can use the pictures and captions endpoints to add pictures and create captions for them.

Further information on how to use the API can be explored in the Swagger UI and OpenApi files:
- /docs
- /openapi.json

## Future Improvements

Some improvements that I want to implement to this project in the future are:
- Testing with Jest
- Cache service with node-cache
- Serverless deployment with Firebase Functions
- Typescript

## Credits

- Nicolas Alonso
