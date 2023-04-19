import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
  query {
    recipe(order_by: { id: asc }) {
      id
      name
      description
      instructions
      number_of_servings
      vegetarian
      calories_per_serving
      source
      food_category_id
      food_category {
        id
        name
      }
      created_by
      time_to_prepare
      recipe_ingredients {
        id
        ingredient {
          id
          name
        }
        quantity
        comments
      }
    }
  }
`;

export const FOOD_CATEGORY_RECIPE_QUERY = gql`
  query {
    food_category(order_by: { id: asc }) {
      id
      name
    }
  }
`;

export const INGREDIENTS_QUERY = gql`
  query {
    ingredient(order_by: { id: asc }) {
      id
      name
    }
  }
`;

export const RECIPE_INGREDIENT_MUTATION = gql`
  mutation(
    $recipe_id: Int!
    $ingredient_id: Int!
    $quantity: Int
    $comments: String
  ) {
    insert_recipe_ingredient(
      objects: [
        {
          ingredient_id: $ingredient_id
          recipe_id: $recipe_id
          quantity: $quantity
          comments: $comments
        }
      ]
    ) {
      returning {
        id
        ingredient_id
        recipe_id
        quantity
        comments
        ingredient {
          id
          name
        }
      }
    }
  }
`;

export const RECIPE_UPDATE_MUTATION = gql`
  mutation(
    $id: Int!
    $name: String!
    $description: String
    $instructions: String
    $food_category_id: Int
    $time_to_prepare: String
    $number_of_servings: Int
    $calories_per_serving: Int
    $created_by: String
  ) {
    update_recipe(
      where: { id: { _eq: $id } }
      _set: {
        name: $name
        description: $description
        instructions: $instructions
        food_category_id: $food_category_id
        time_to_prepare: $time_to_prepare
        number_of_servings: $number_of_servings
        calories_per_serving: $calories_per_serving
        created_by: $created_by
      }
    ) {
      returning {
        id
        name
        description
        instructions
        number_of_servings
        vegetarian
        calories_per_serving
        source
        food_category_id
        food_category {
          id
          name
        }
        created_by
        time_to_prepare
        recipe_ingredients {
          id
          ingredient {
            id
            name
          }
          quantity
          comments
        }
      }
    }
  }
`;
