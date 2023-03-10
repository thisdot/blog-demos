import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    "Query to get a restaurant guest"
    restaurantGuest: Guest
  }

  "An individual guest"
  type Guest {
    id: ID!
    "Guest's name"
    name: String!
    "Guest's email"
    email: String!
    "Guest's phoneNumber"
    phoneNumber: String!
    "Whether or not the guest has a reservation"
    foodReservation: Boolean!
  }
`;
