# Captions Service

This project implements a multi-feature interaction together with some other production-ready practices.
The API features security measures (helmet, basic auth + jwt cookies, bcrypt password hashing, RBAC) and allows users to upload picture-urls, add captions to them, and keep track of their activity.
The project is documented with a Swagger UI integration in the /docs endpoint.

## Tech Stack

- Implementation:
  - Node.js
  - Express
- Infrastructure:
  - Mongoose
- Security:
  - helmet
  - jsonwebtoken
  - bcrypt
- Documentation:
  - swagger-ui-express

## Features

The API includes the following routes:
- /auth (Register, Login, Logout)
- /users (List, Update Role, Delete)
- /pictures (CRUD Operations)
- /captions (CRUD Operations)

## Relations

User model references the `captionId`.  
Picture references the `captionId`.  
Caption references both the `userId` and `pictureId`.  

The API is documented with an `openapi.json` file (served at `/openapi.json` endpoint) and a Swagger UI (served at `/docs` endpoint).

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
