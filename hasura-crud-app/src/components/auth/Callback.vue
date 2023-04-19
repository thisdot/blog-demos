<template>
  <Waiting />
</template>

<script>
import Waiting from "@/components/shared/Waiting.vue";

export default {
  name: "callback",
  components: {
    Waiting
  },
  mounted() {
    this.$store.dispatch("account/handleAuthenticationResponse");
  }
};
</script>

<style scoped></style>
