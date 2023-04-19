<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="/">Yummy Food!</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'recipes' }"
              >Recipes</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="isLoggedIn">
            <a href="" class="nav-link" @click.prevent="logout();">Logout</a>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <a href="" class="nav-link" @click.prevent="login();">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppNav",
  computed: {
    isLoggedIn() {
      return this.getUser();
    }
  },
  methods: {
    ...mapGetters("account", { getUser: "getUser" }),
    logout() {
      this.$store.dispatch("account/logout");
    },
    login() {
      this.$store.dispatch("account/login");
    }
  }
};
</script>

<style scoped>
.navbar-nav .nav-item .nav-link.router-link-active.router-link-exact-active {
  color: white;
}
</style>
