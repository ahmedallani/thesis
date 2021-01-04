<template>
  <v-container class="container">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h1>Welcome to ESCAPER</h1>
        <h2>Make life worth living</h2>
        <h2>find yourself <em>outside</em></h2>
      </v-col>
    </v-row>

    <activities />
  </v-container>
</template>

<script>
import activities from "@/components/activities.vue";
// import addActivity from "@/components/addActivity.vue";
export default {
  components: { activities }
};
</script>
<style scoped>
.container {
  text-align: center;
  background-color: rgb(58, 155, 106);
  width: 100%;
  margin: 0;
}
</style>
