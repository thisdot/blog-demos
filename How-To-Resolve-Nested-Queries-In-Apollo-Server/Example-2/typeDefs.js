const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar USCurrency

  type Accessory {
    id: ID!
    product: String!
    price: USCurrency
    brandId: Int
  }

  type Brand {
    id: ID!
    brandName: String!
    accessories: [Accessory]
  }

  type Query {
    brands: [Brand]
    accessory(id: Int): Accessory
  }
`;

module.exports = typeDefs;
