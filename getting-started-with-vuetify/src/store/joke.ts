import { defineStore } from "pinia";

export interface Joke {
  id: number;
  title: string;
  punchline: string;
}

export const useJokeStore = defineStore({
  id: "joke",
  state: () => ({
    jokes: [] as Joke[],
  }),
  actions: {
    addJoke(joke: Joke) {
      this.jokes.push(joke);
    },
    removeJoke(id: number) {
      this.jokes = this.jokes.filter((joke) => joke.id !== id);
    },
  },
});
