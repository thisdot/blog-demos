const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typedefs');
const resolvers = require('./schema/resolvers');
const StarwarsAPI = require('./rest-api-sources/starwars-rest-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({}),
  context: () => {
    return {
      starwarsAPI: new StarwarsAPI(),
    };
  },
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000
  `);
});
