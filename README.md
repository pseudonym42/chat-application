# Description

This repository contains code for a chat application built
with NodeJS, React and GraphQL.

All data is stored in a MySQL database which runs inside a docker container, see the `docker` folder for more details.

Database migrations, queries and models are managed with `sequelize` and `sequelize-cli` libraries.

# Useful commands

To generate a model:

    npx sequelize model:generate --name User --attributes username:string,email:string

To run migrations:

    npx sequelize db:migrate
