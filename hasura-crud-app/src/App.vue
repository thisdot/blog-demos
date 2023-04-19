<template>
  <div>
    <AppNav />

    <main role="main" class="container"><router-view></router-view></main>

    <AppFooter />
  </div>
</template>
<script>
import AppNav from "@/components/shared/AppNav.vue";
import AppFooter from "@/components/shared/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppNav,
    AppFooter
  }
};
</script>
<style></style>
