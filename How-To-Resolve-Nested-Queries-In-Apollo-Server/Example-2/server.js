const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const { BrandAccessoryDataSource } = require("./brandAccessoryDataSource");
const { musicBrands } = require("./musicData");
const { USCurrency } = require("graphql-currency-scalars");

const resolvers = {
  USCurrency,
  Query: {
    brands: () => musicBrands,
    accessory: (_, { id }, context) =>
      context.dataSources.brandAccessories.get(id),
  },
  Brand: {
    accessories: (brand, _, context) =>
      context.dataSources.brandAccessories.getByBrand(brand),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ brandAccessories: new BrandAccessoryDataSource() }),
});

server
  .listen(4000)
  .then(({ url }) => console.log(`The server has started at ${url}`));
