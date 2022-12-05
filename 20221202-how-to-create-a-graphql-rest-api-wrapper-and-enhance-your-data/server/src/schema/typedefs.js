const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    person(id: ID, personID: ID): Person
  }

  """
  An individual person or character within the Star Wars universe.
  """
  type Person {
    """
    The name of this person.
    """
    name: String

    """
    The birth year of the person, using the in-universe standard of BBY or ABY -
    Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is
    a battle that occurs at the end of Star Wars episode IV: A New Hope.
    """
    birthYear: String

    """
    The eye color of this person. Will be "unknown" if not known or "n/a" if the
    person does not have an eye.
    """
    eyeColor: String

    """
    The gender of this person. Either "Male", "Female" or "unknown",
    "n/a" if the person does not have a gender.
    """
    gender: String

    """
    The hair color of this person. Will be "unknown" if not known or "n/a" if the
    person does not have hair.
    """
    hairColor: String

    """
    The height of the person in centimeters.
    """
    height: Int

    """
    The mass of the person in kilograms.
    """
    mass: Float

    """
    The skin color of this person.
    """
    skinColor: String

    """
    A planet that this person was born on or inhabits.
    """
    homeworld: Planet

    """
    The ISO 8601 date format of the time that this resource was created.
    """
    created: String

    """
    The ISO 8601 date format of the time that this resource was edited.
    """
    edited: String
  }

  """
  A large mass, planet or planetoid in the Star Wars Universe, at the time of
  0 ABY.
  """
  type Planet {
    """
    The name of this planet.
    """
    name: String

    """
    The diameter of this planet in kilometers.
    """
    diameter: Int

    """
    The number of standard hours it takes for this planet to complete a single
    rotation on its axis.
    """
    rotationPeriod: Int

    """
    The number of standard days it takes for this planet to complete a single orbit
    of its local star.
    """
    orbitalPeriod: Int

    """
    A number denoting the gravity of this planet, where "1" is normal or 1 standard
    G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
    """
    gravity: String

    """
    The average population of sentient beings inhabiting this planet.
    """
    population: Float

    """
    The climates of this planet.
    """
    climates: [String]

    """
    The terrains of this planet.
    """
    terrains: [String]

    """
    The percentage of the planet surface that is naturally occurring water or bodies
    of water.
    """
    surfaceWater: Float

    """
    The ISO 8601 date format of the time that this resource was created.
    """
    created: String

    """
    The ISO 8601 date format of the time that this resource was edited.
    """
    edited: String
  }
`;

module.exports = typeDefs;
