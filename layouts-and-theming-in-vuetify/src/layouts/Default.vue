<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Joke Machine</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer color="primary" app>
      <span>&copy; 2023 Joke Machine</span>
    </v-footer>
  </v-app>
</template>
