# Description

This repository contains code for a chat application built
with NodeJS, React and GraphQL.

The application consists of the server and client specific codes. The client code
is located in the `client` folder.

# Project structure and main components

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
