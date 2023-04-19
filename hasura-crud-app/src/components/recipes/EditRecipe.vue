<template>
  <div class="container">
    <div class="recipe">
      <div class="actions">
        <div>
          <router-link
            class="btn btn-secondary"
            v-bind:to="{ path: '/recipes' }"
          >
            Back to Recipes
          </router-link>
        </div>
        <div>
          <button class="btn btn-primary" @click.prevent="updatRecipe">
            Save
          </button>
        </div>
      </div>
      <div class="recipe-header"><h2>Edit Recipe</h2></div>
      <Waiting v-if="isLoading" />
      <div class="recipe-body" v-if="!isLoading">
        <form novalidate>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="name" class="col-form-label">Recipe Name</label>
              <input
                class="form-control"
                id="name"
                v-model="recipe.name"
                required
              />
            </div>
            <div class="form-group col-md-6">
              <label for="food_category_id" class="col-form-label"
                >Food Category</label
              >
              <select
                class="form-control"
                id="food_category_id"
                v-model="recipe.food_category_id"
              >
                <option
                  v-for="(option, i) in foodCategoryList"
                  :key="i"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="description" class="col-form-label"
                >Description</label
              >
              <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="recipe.description"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="instructions" class="col-form-label"
                >Instructions</label
              >
              <textarea
                class="form-control"
                id="instructions"
                rows="3"
                v-model="recipe.instructions"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="time_to_prepare" class="col-form-label"
                >Time to prepare</label
              >
              <input
                class="form-control"
                id="time_to_prepare"
                v-model="recipe.time_to_prepare"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="number_of_servings" class="col-form-label"
                >Servings</label
              >
              <input
                class="form-control"
                type="number"
                id="number_of_servings"
                v-model="recipe.number_of_servings"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="calories_per_serving" class="col-form-label"
                >Calories</label
              >
              <input
                class="form-control"
                type="number"
                id="calories_per_serving"
                v-model="recipe.calories_per_serving"
                required
              />
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ingredient</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(ingredient, i) in recipe.recipe_ingredients"
                  :key="i"
                >
                  <th scope="row">{{ ingredient.id }}</th>
                  <td>{{ ingredient.ingredient.name }}</td>
                  <td>{{ ingredient.quantity }}</td>
                  <td>{{ ingredient.comments }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <hr class="default" />
        <form @submit.prevent="addIngredient" novalidate>
          <div class="form-row">
            <div class="form-group col-lg-3">
              <label for="ingredient_id" class="col-form-label"
                >Ingredient</label
              >
              <select
                class="form-control"
                id="ingredient_id"
                v-model="recipe_ingredient.ingredient_id"
              >
                <option
                  v-for="(option, i) in ingredientList"
                  :key="i"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
            <div class="form-group col-lg-1">
              <label for="quantity" class="col-form-label">Quantity</label>
              <input
                class="form-control"
                type="number"
                id="quantity"
                v-model="recipe_ingredient.quantity"
              />
            </div>
            <div class="form-group col-lg-6">
              <label for="comments" class="col-form-label">Comments</label>
              <input
                class="form-control"
                id="comments"
                v-model="recipe_ingredient.comments"
              />
            </div>
            <div class="form-group col-lg-2 ingredient-button">
              <button type="submit" class="btn btn-primary">
                Add Ingredient
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Waiting from '@/components/shared/Waiting.vue';

export default {
  name: 'EditRecipe',
  data() {
    return {
      recipe_ingredient: {
        ingredient_id: '',
        quantity: 0,
        comments: ''
      }
    };
  },
  components: {
    Waiting
  },
  computed: {
    ...mapState('recipes', {
      foodCategoryList: 'foodCategoryList',
      ingredientList: 'ingredientList',
      isLoading: 'isLoading'
    }),
    ...mapGetters('recipes', { recipe: 'selectedRecipe' })
  },
  mounted() {
    this.$store.dispatch('recipes/fetchFoodCategoryList');
    this.$store.dispatch('recipes/fetchIngredientList');
  },
  methods: {
    updatRecipe($event) {
      const {
        id,
        name,
        description,
        instructions,
        food_category_id,
        number_of_servings,
        time_to_prepare,
        calories_per_serving,
        source,
        vegetarian
      } = this.recipe;

      this.$store.dispatch('recipes/updateRecipe', {
        id,
        name,
        description,
        instructions,
        food_category_id,
        number_of_servings,
        time_to_prepare,
        calories_per_serving
      });
    },
    addIngredient($event) {
      const payload = {
        ...this.recipe_ingredient,
        quantity: +this.recipe_ingredient.quantity,
        recipe_id: this.recipe.id
      };

      this.$store.dispatch('recipes/insertRecipeIngredient', payload);

      this.recipe_ingredient = {
        ingredient_id: '',
        quantity: 0,
        comments: ''
      };
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 20px;
}
.actions {
  display: flex;
  justify-content: space-between;
}
.recipe .recipe-header {
  margin-top: 20px;
  text-align: center;
}
.recipe .recipe-body {
  margin-top: 20px;
}
form table {
  margin-top: 20px;
}
.ingredient-button {
  text-align: right;
}

@media screen and (min-width: 992px) {
  .ingredient-button {
    padding-top: 37px;
  }
}
</style>
