<template>
  <v-container class="container">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h1>Welcome to ESCAPER</h1>
        <h2>Make life worth living</h2>
        <h2>find yourself <em>outside</em></h2>
      </v-col>
    </v-row>

    <displayBlog />
    <createBlog />
  </v-container>
</template>

<script>
import displayBlog from "@/components/displayBlog.vue";
import createBlog from "@/components/createBlog.vue";
export default {
  components: { displayBlog, createBlog }
};
</script>
<style scoped></style>
