const { ApolloServer } = require('apollo-server');
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const contextMiddleware = require('./util/contextMiddleware');
const { sequelize } = require('./models');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextMiddleware,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
    sequelize.authenticate()
        .then(() => console.log("Database connected"))
        .catch(error => console.error(error));
});
