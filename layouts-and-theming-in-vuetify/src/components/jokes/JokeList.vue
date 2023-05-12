<template>
  <v-card>
    <v-card-title>
      My Jokes
      <v-icon icon="mdi-emoticon-excited-outline"></v-icon>
    </v-card-title>
    <v-card-text>
      <v-list v-if="jokeStore.jokes.length">
        <v-list-item v-for="joke in jokeStore.jokes" :key="joke.id">
          <v-row>
            <v-col cols="10">
              <v-list-item-subtitle>{{ joke.title }}</v-list-item-subtitle>
              <v-list-item-title>
                {{ joke.punchline }}
              </v-list-item-title>
            </v-col>
            <v-col cols="2">
              <v-list-item-action>
                <v-btn
                  color="error"
                  variant="outlined"
                  @click="deleteJoke(joke)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-alert v-else type="info"> You have no jokes. Add some! </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Joke, useJokeStore } from "@/store/joke";

const jokeStore = useJokeStore();

function deleteJoke(joke: Joke) {
  jokeStore.removeJoke(joke.id);
  //
}
</script>
