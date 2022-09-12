# Introduction

This repository contains code for a chat application built with NodeJS, React and GraphQL.
I wrote this code to learn more about GraphQL and how it is used, and also to refresh my knowledge about React.

The application consists of the server and client specific codes. The client code
is located in the `client` folder.

Check resolvers in `graphql/resolvers` folder for more information about what functionality
the backend provides, but in short it allws uses to register, login and send messages to each other.

The communication between frontend and backend is done with the help of [apollo](https://www.apollographql.com/) library.

If you are not familiar with react `.createContext` API used in this application please
read this article [How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively).

# Project structure and main components

This repository contains both front- and back-end code. See folder `client` for the frontend code. The backend code is distributed appropriately into 

## Database

All data is stored in a MySQL database which runs inside a docker container, see the `docker` folder for more details.

Database migrations, queries and models are managed with `sequelize` and `sequelize-cli` libraries. Here are some useful commands:

1. To generate a model:

    npx sequelize model:generate --name User --attributes username:string,email:string

2. To run migrations:

    npx sequelize db:migrate

All generated migrations are placed into `migrations` folder. All DB models located in
`models` folder.

Dabase configuration is stored in the `config` folder.

## Configuratoin and secrets

Various app configuration for different environments and app secrets are located
in `config` folder. Secrets are stored in `config/env.js` file which is gitignor'ed.

## GraphQL

All resolvers and GraphQL models are stored in the relevant `graphql` folder.


## How to run the app

Backend app:

    > npm run dev

Frontend client:

    > npm start