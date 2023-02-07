const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar USCurrency

  type MusicBrand {
    id: ID!
    brandName: String
  }

  type MusicAccessories {
    id: ID!
    product: String
    price: USCurrency
    brandId: Int
    brands: [MusicBrand]
  }

  type Query {
    accessories: [MusicAccessories]
  }
`;

module.exports = typeDefs;
