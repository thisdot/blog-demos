import { router } from '@/router';
import gqlClient from '@/services/apollo';
import { authService } from '@/services/auth/AuthService';

import {
  RECIPES_QUERY,
  FOOD_CATEGORY_RECIPE_QUERY,
  INGREDIENTS_QUERY,
  RECIPE_INGREDIENT_MUTATION,
  RECIPE_UPDATE_MUTATION
} from '@/queries';

let state = {
  all: [],
  one: '',
  foodCategoryList: [],
  ingredientList: [],
  isLoading: false
};

const actions = {
  async findAll({ commit }) {
    commit('setLoading', true);
    const response = await gqlClient.query({
      query: RECIPES_QUERY
    });
    commit('setRecipeList', response.data.recipe);
  },
  selectRecipe({ commit }, recipeId) {
    commit('setRecipe', recipeId);
    router.push({ name: 'editRecipe', params: { recipeId: recipeId } });
  },
  async fetchFoodCategoryList({ commit }) {
    const response = await gqlClient.query({
      query: FOOD_CATEGORY_RECIPE_QUERY
    });
    commit('setFoodCategoryList', response.data.food_category);
  },
  async fetchIngredientList({ commit }) {
    const response = await gqlClient.query({ query: INGREDIENTS_QUERY });
    commit('setIngredientList', response.data.ingredient);
  },
  async insertRecipeIngredient({ dispatch, commit }, recipeIngredient) {
    const response = await gqlClient.mutate({
      mutation: RECIPE_INGREDIENT_MUTATION,
      variables: {
        ...recipeIngredient
      }
    });

    dispatch('findAll');
  },
  async updateRecipe({ dispatch, commit }, recipe) {
    const response = await gqlClient.mutate({
      mutation: RECIPE_UPDATE_MUTATION,
      variables: {
        ...recipe,
        created_by: authService.getUserId()
      }
    });

    window.location.assign('/recipes');
  }
};

const mutations = {
  setRecipeList(state, recipeList) {
    state.all = [...recipeList];
    state.isLoading = false;
  },
  setRecipe(state, recipeId) {
    state.one = recipeId;
  },
  setFoodCategoryList(state, foodCategoryList) {
    state.foodCategoryList = [...foodCategoryList];
  },
  setIngredientList(state, ingredientList) {
    state.ingredientList = [...ingredientList];
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  }
};

const getters = {
  selectedRecipe(state) {
    return state.all.find(item => item.id == state.one);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
