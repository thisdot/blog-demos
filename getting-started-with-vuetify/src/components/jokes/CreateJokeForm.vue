<template>
  <v-form @submit.prevent="submitJoke">
    <v-text-field
      v-model="jokeTitle"
      label="Joke Title"
      outlined
      required
    ></v-text-field>
    <v-text-field
      v-model="jokePunchline"
      label="Joke Punchline"
      outlined
      required
    ></v-text-field>

    <v-btn
      color="primary"
      :disabled="!jokeTitle || !jokePunchline"
      type="submit"
      >Submit Joke</v-btn
    >
  </v-form>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Joke, useJokeStore } from "@/store/joke";

const jokeStore = useJokeStore();

const jokeTitle = ref("");
const jokePunchline = ref("");

const joke = computed<Joke>(() => ({
  id: jokeStore.jokes.length + 1,
  title: jokeTitle.value,
  punchline: jokePunchline.value,
}));

function submitJoke() {
  jokeStore.addJoke(joke.value);

  // reset the form inputs
  jokeTitle.value = "";
  jokePunchline.value = "";
}
</script>
