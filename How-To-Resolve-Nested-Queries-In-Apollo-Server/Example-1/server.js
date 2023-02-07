const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const { musicAccessories, musicBrands } = require("./musicData");
const { USCurrency } = require("graphql-currency-scalars");

const resolvers = {
  USCurrency,
  Query: {
    accessories: () => musicAccessories,
  },
  MusicAccessories: {
    brands: (parent) => {
      const isBrandInAccessory = (brand) => brand.id === parent.brandId;
      return musicBrands.filter(isBrandInAccessory);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000).then(({ url }) => {
  console.log(`The server has starter on ${url}`);
});
