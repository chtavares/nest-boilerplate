# Nest API boilerplate by nave.rs

A boilerplate for building RESTful APIs using Nest.js, PostgreSQL, TypeORM.

# Getting started

## Installation

1. Install [Node.JS](https://nodejs.org/en/) LTS version
2. Install PostgreSQL
3. Clone this repository and enter on the respective folder
4. Install dependencies running: `yarn` or `npm install`

## Things to do before run the project:

1. Create database (by follow the commands):

- CREATE USER `user` WITH PASSWORD `password`
- CREATE DATABASE `database`
- GRANT ALL PRIVILEGES ON DATABASE `database` to `user`
  `

2. Change name value of .env.example to .env and set the key SECRET to any value you wish
3. Change the database info at .env for yours config
4. Run `npm run start` or `npm run start:dev` to start server

## Testing

1. Run tests: `npm run test`

## Directory Structure

```
├── /src
|   ├── /app
|   |   |── /role
|   |   |   |── /entity
|   |   |── /user
|   |   |  |── /entity
|   |   |  |── /dto
|   |   |  |── /interface
|   ├── /constant
|   ├── /helpers
|   ├── /strategy
├── /test
```

## Postman

[You can import the Postman collection here](https://www.getpostman.com/collections/c9b038ec63dfae147b04)

## Styleguide

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
