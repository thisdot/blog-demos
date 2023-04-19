<template>
  <div class="recipes">
    <div class="container">
      <div class="row content">
        <div class="col-md-12"><h2 class="text-center">Recipes</h2></div>
      </div>
      <Waiting v-if="isLoading" />
      <div class="row" v-for="(recipe, index) in recipes" :key="index">
        <div class="col-md-12 reset-padding">
          <div class="one-recipe">
            <div class="recipe-header">
              <div class="recipe-title" @click="goToRecipe(recipe.id);">
                <h3>{{ recipe.name }}</h3>
              </div>
              <p class="recipe-description">{{ recipe.description }}</p>
            </div>
            <div class="recipe-body">
              <div class="recipe-servings">
                <span class="label">Servings: </span
                ><span>{{ recipe.number_of_servings }}</span>
              </div>
              <div class="recipe-calories">
                <span class="label">Calories: </span
                ><span>{{ recipe.calories_per_serving }}</span>
              </div>
              <div class="recipe-time">
                <span class="label">Time to prepare: </span
                ><span>{{ recipe.time_to_prepare }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Waiting from '@/components/shared/Waiting.vue';

export default {
  name: 'RecipeList',
  components: {
    Waiting
  },
  computed: {
    ...mapState('recipes', { recipes: 'all', isLoading: 'isLoading' })
  },
  mounted() {
    this.$store.dispatch('recipes/findAll');
  },
  methods: {
    goToRecipe($event) {
      this.$store.dispatch('recipes/selectRecipe', +$event);
    }
  }
};
</script>

<style scoped>
.content {
  margin-bottom: 50px;
}
.reset-padding {
  padding: 0 !important;
}
.one-recipe {
  margin-bottom: 30px;
  padding-right: -15px;
  padding-left: -15px;
  color: #373c42;
}
.recipe-header .recipe-title h3 {
  padding: 10px 10px 10px 15px;
  margin-bottom: 5px;
  background-color: #47294d;
  color: #fff;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
}
.recipe-description {
  font-size: 0.9rem;
  padding: 20px 10px;
  margin: 0;
}
.recipe-body {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
}
.recipe-body .recipe-servings,
.recipe-body .recipe-calories,
.recipe-body .recipe-time {
  padding: 10px;
}
.recipe-body span.label {
  font-weight: bold;
  font-size: 1rem;
}
@media screen and (min-width: 768px) {
  .recipe-description {
    padding: 20px;
  }
  .recipe-body .recipe-servings,
  .recipe-body .recipe-calories,
  .recipe-body .recipe-time {
    padding-right: 20px;
    padding-left: 20px;
  }
}
</style>
